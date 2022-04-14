import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-edit-machine',
  templateUrl: './edit-machine.page.html',
  styleUrls: ['./edit-machine.page.scss'],
})
export class EditMachinePage implements OnInit {

  _id = '';
  machine_id = '';
  capacity = 0;
  token = '';

  public machine: MachineDetails[];

  constructor(public router: ActivatedRoute,
    public navCtrl: NavController,
    public http: HttpServiceService,
    public common: CommonService,
    public platform: Platform,
    public alertCtrl: AlertController) {

    this.router.queryParams.subscribe(params => {
      this._id = params['_id'];
      this.token = params['token'];
    });

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.machine = [];
    if (this.platform.is('cordova')) {
      this.http.getMachineDetails(this.token, this._id).subscribe((res) => {
        this.machine = JSON.parse(res.data) as Array<MachineDetails>;
      })
    } else {
      this.http.getMachineDetails_web(this.token, this._id).subscribe((res) => {
        this.machine = res as Array<MachineDetails>;
        this.machine_id = this.machine[0].machine_id;
        this.capacity = this.machine[0].capacity;
      })
    }

  }


  edit() {
      let req = this.http.updateMachine_web(this.token, this._id, this.machine_id, this.capacity).subscribe((res) => {
        if (res == 'success') {
          this.navCtrl.back();
          this.common.displayToast('Branch deleted successfully');
        }
        req.unsubscribe();
      }, err => {
        this.common.displayAlert("Opps!", typeof err == 'object' ? JSON.stringify(err) : err);
      });
  }


  async delete() {
    let alert = await this.alertCtrl.create({
      header: "Are you sure to delete this machine ?",
      mode: 'ios',
      buttons: [
        {
          text: "Yes, Delete",
          handler: () => {
            if (this.platform.is('cordova')) {
              let req = this.http.deleteMachine(this.token, this._id).subscribe((res) => {
                if (JSON.parse(res.data) == 'success') {
                  this.navCtrl.back();
                  this.common.displayToast('Branch deleted successfully');
                }
                req.unsubscribe();
              })
            } else {
              let req = this.http.deleteMachine_web(this.token, this._id).subscribe((res) => {
                if (res == 'success') {
                  this.navCtrl.back();
                  this.common.displayToast('Branch deleted successfully');
                }
                req.unsubscribe();
              })
            }
          }
        },
        {
          text: 'No, Keep it',
          role: 'cancel',
          handler: () => {

          }
        }

      ]
    });
    alert.present();
  }

}

interface MachineDetails {
  machine_id: string,
  capacity: number
}

