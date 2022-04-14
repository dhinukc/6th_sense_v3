import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { ToastController, ModalController, PopoverController, NavController, Platform } from '@ionic/angular';
import { DownloadQrPage } from 'src/app/popup/download-qr/download-qr.page';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.page.html',
  styleUrls: ['./machines.page.scss'],
})
export class MachinesPage implements OnInit {

  machineList: Machine[] = [];

  //QRValue = "";
  elementType = 'canvas';

  client_id = '';
  branch_id = '';
  token = '';
  branch_name = '';
  client_name = '';
  vpa = '';
  vpa_status = 0;
  vpa_name = '';


  constructor(
    public statusBar: StatusBar,
    public base64ToGallery: Base64ToGallery,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public popover: PopoverController,
    public navCtrl: NavController,
    public router: ActivatedRoute,
    public http: HttpServiceService,
    public platform: Platform,
    public common: CommonService) {

    this.router.queryParams.subscribe(params => {
      this.client_id = params['client_id'];
      this.branch_id = params['branch_id'];
      this.token = params['token'];
      this.branch_name = params['branch_name'];
      this.client_name = params['client_name'];
      this.vpa = params['vpa'];
      this.vpa_status = params['vpa_status'];
      this.vpa_name = params['vpa_name'];
    })



  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.statusBar.backgroundColorByHexString("#6e7bf2");
    //alert(this.vpa)

    if (this.platform.is('cordova')) {
      this.http.getMachineList(this.token, this.client_id, this.branch_id).subscribe((res) => {
        this.machineList = JSON.parse(res.data) as Array<Machine>;
      })
    } else {
      this.http.getMachineList_web(this.token, this.client_id, this.branch_id).subscribe((res) => {
        this.machineList = res as Array<Machine>;
      })
    }
  }



  async createMachine() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        client_id: this.client_id,
        branch_id: this.branch_id,
        token: this.token,
        client_name: this.client_name,
        branch_name: this.branch_name,
      }
    }
    this.navCtrl.navigateForward(['register-machine'], navigationExtras);
  }


  editMachine(machine) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        _id: machine._id,
        token: this.token
      }
    }
    this.navCtrl.navigateForward(['edit-machine'], navigationExtras);
  }


  async popup(ev, machine) {
    let popover = await this.popover.create({
      component: DownloadQrPage,
      event: ev,
      translucent: true,
      mode: 'ios'
    });

    await popover.present();
    await popover.onDidDismiss().then(async (data) => {
      //alert(data.role);
      if (data.role == 'selected') {
        //this.downloadQR();
        if (this.vpa_status == 0) {
          this.common.displayAlert("VPA is not activated", "VPA is not activated for this machine");
        } else {


          let navigationExtras: NavigationExtras = {
            queryParams: {
              client_id: this.client_id,
              branch_id: this.branch_id,
              token: this.token,
              client_name: this.client_name,
              branch_name: this.branch_name,
              vpa: this.vpa,
              vpa_status: this.vpa_status,
              vpa_name: this.vpa_name,
              machine_id: machine.machine_id,
              machine_db_id: machine._id,
              machineStaticId: machine.machine_static_id,
              middleZeros: machine.middle_zeros,
            }
          }

          this.navCtrl.navigateForward(['download-qr'], navigationExtras);
        }


      }
    })
  }


  history(machine){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        token: this.token,
        _id: machine._id,
        machine_id: machine.machine_id
      }
    };


    this.navCtrl.navigateForward(['history'], navigationExtras);
  }

}

interface MachineList {
  machine: Machine[];
}

interface Machine {
  _id: string,
  company: string,
  branch: string,
  machine_id: string,
  capacity: number,
  machine_static_id: string,
  middle_zeros: string
}
