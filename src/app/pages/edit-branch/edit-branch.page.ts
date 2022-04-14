import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.page.html',
  styleUrls: ['./edit-branch.page.scss'],
})
export class EditBranchPage implements OnInit {

  public branch_id = '';
  public token = '';
  public branchData: BranchData;

  name = '';
  city = '';
  state = '';
  country = '';
  pincode = '';

  constructor(public navCtrl: NavController,
    public http: HttpServiceService,
    public common: CommonService,
    public router: ActivatedRoute,
    public alertCtrl: AlertController,
    public statusBar: StatusBar,
    public platform: Platform) {

    this.router.queryParams.subscribe(params => {
      this.branch_id = params['branch_id'],
        this.token = params['token']
    })

  }

  ngOnInit() {
  }

  ionViewDidEnter() {

    this.statusBar.backgroundColorByHexString("#6e7bf2");

    if (this.platform.is('cordova')) {
      this.http.getBranchDetails(this.token, this.branch_id).subscribe((res) => {
        this.branchData = JSON.parse(res.data) as BranchData;

        this.name = this.branchData.name;
        this.city = this.branchData.city;
        this.state = this.branchData.state;
        this.country = this.branchData.country;
        this.pincode = this.branchData.pincode;
      })
    } else {
      this.http.getBranchDetails_web(this.token, this.branch_id).subscribe((res) => {
        this.branchData = res as BranchData;

        this.name = this.branchData.name;
        this.city = this.branchData.city;
        this.state = this.branchData.state;
        this.country = this.branchData.country;
        this.pincode = this.branchData.pincode;
      })
    }
  }



  async delete() {
    let alert = await this.alertCtrl.create({
      header: "Are you sure to delete this branch ?",
      mode: 'ios',
      buttons: [
        {
          text: "Yes, Delete",
          handler: () => {
            if (this.platform.is('cordova')) {
              let req = this.http.deleteBranch(this.token, this.branch_id).subscribe((res) => {
                if (JSON.parse(res.data) == 'success') {
                  this.navCtrl.back();
                  this.common.displayToast('Branch deleted successfully');
                }
                req.unsubscribe();
              })
            } else {
              let req = this.http.deleteBranch_web(this.token, this.branch_id).subscribe((res) => {
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


  edit() {
    if (this.name == '') {
      this.common.displayAlert('Field Missing', 'All the fields are mandatory, Please fill branch_name.');
      return false;
    }
    if (this.city == '') {
      this.common.displayAlert('Field Missing', 'All the fields are mandatory, Please fill city.');
      return false;
    }
    if (this.state == '') {
      this.common.displayAlert('Field Missing', 'All the fields are mandatory, Please fill state.');
      return false;
    }
    if (this.country == '') {
      this.common.displayAlert('Field Missing', 'All the fields are mandatory, Please fill country.');
      return false;
    }
    if (this.pincode == '') {
      this.common.displayAlert('Field Missing', 'All the fields are mandatory, Please fill pincode.');
      return false;
    }


    this.http.updateBranch_web(this.token, this.branch_id, this.name, this.city, this.state, this.country, this.pincode).subscribe((res) => {
      if (res == 'success') {
        this.navCtrl.back();
        this.common.displayToast("Branch updated successfully");
      }
    }, err => {
      this.common.displayAlert("Opps!", typeof err == 'object' ? JSON.stringify(err) : err);
    });
  }

}


interface BranchData {
  name: string,
  city: string,
  state: string,
  country: string,
  pincode: string
}
