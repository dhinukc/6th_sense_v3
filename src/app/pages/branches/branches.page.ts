import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.page.html',
  styleUrls: ['./branches.page.scss'],
})
export class BranchesPage implements OnInit {

  client_name = '';
  client_id = '';
  token = '';
  vpa = '';
  vpa_status = 0;
  vpa_name = '';

  public branchList: BranchList[] = [];

  constructor(public router: ActivatedRoute,
    public statusBar: StatusBar,
    public navCtrl: NavController,
    public http: HttpServiceService,
    public platfrom: Platform) {
    this.router.queryParams.subscribe(params => {
      this.client_name = params['client_name'];
      this.client_id = params['client_id'];
      this.token = params['token'];
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

    if (this.platfrom.is('cordova')) {
      let req = this.http.getBranchList(this.token, this.client_id).subscribe((res) => {
        console.log(JSON.stringify(res));
        this.branchList = [];
        this.branchList = JSON.parse(res.data) as Array<BranchList>;
        req.unsubscribe();
      })
    } else {
      let req = this.http.getBranchList_web(this.token, this.client_id).subscribe((res) => {
        console.log(JSON.stringify(res));
        this.branchList = [];
        this.branchList = res as Array<BranchList>;
        req.unsubscribe();
      })
    }

  }


  createMachines(branch) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        client_id: this.client_id,
        branch_id: branch._id,
        token: this.token,
        branch_name: branch.name,
        client_name: this.client_name,
        vpa: this.vpa,
        vpa_status: this.vpa_status,
        vpa_name: this.vpa_name
      }
    }
    this.navCtrl.navigateForward(['machines'], navigationExtras);
  }


  createBranch() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        client_id: this.client_id,
        token: this.token
      }
    }
    this.navCtrl.navigateForward(['register-branch'], navigationExtras);
  }

  editClient() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        client_id: this.client_id,
        token: this.token
      }
    }
    this.navCtrl.navigateForward(['edit-client'], navigationExtras);
  }


  editBranch(branch) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        branch_id: branch._id,
        token: this.token
      }
    }
    this.navCtrl.navigateForward(['edit-branch'], navigationExtras);
  }

}

interface BranchList {
  _id: string,
  email: string,
  phone: string,
  name: string,
  code: string,
  city: string,
  state: string,
  country: string,
  pincode: number,
  status: string,
  company: string,
}
