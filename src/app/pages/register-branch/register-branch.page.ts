import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-register-branch',
  templateUrl: './register-branch.page.html',
  styleUrls: ['./register-branch.page.scss'],
})
export class RegisterBranchPage implements OnInit {
  public client_id = '';
  public token = '';

  name = '';
  city = '';
  state = '';
  country = '';
  pincode = '';


  constructor(public router: ActivatedRoute,
    public alertCtrl: AlertController,
    public common: CommonService,
    public http: HttpServiceService,
    public navCtrl: NavController,
    public statusBar: StatusBar,
    public platform: Platform) {
    this.router.queryParams.subscribe(params => {
      this.client_id = params['client_id'];
      this.token = params['token'];

    })
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.statusBar.backgroundColorByHexString("#6e7bf2");
  }


  async register() {
    if (this.name == '') {
      this.common.displayAlert('Field Missing', 'All the fields are mandatory, Please fill name.');
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

    let req = this.http.registerBranch_web(this.token, this.client_id, this.name, this.city, this.state, this.country, this.pincode).subscribe((res) => {
      //this.navCtrl.navigateBack(['branches']);
      this.navCtrl.back()
      this.common.displayToast('New branch is added successfully');
    }, err => {
      this.common.displayAlert("Opps!", typeof err == 'object' ? JSON.stringify(err) : err);
    });

  }

}
