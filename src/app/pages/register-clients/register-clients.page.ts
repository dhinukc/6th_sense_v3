import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-register-clients',
  templateUrl: './register-clients.page.html',
  styleUrls: ['./register-clients.page.scss'],
})
export class RegisterClientsPage implements OnInit {

  activate = false;
  token = '';

  company_name = '';
  email = '';
  gst_no = '';
  contact_person = '';
  phone_no = '';
  merchant_id = '';

  branch_name = '';
  city = '';
  state = '';
  country = '';
  pincode = '';
  merchant_name = '';


  constructor(public common: CommonService,
    public http: HttpServiceService,
    public navCtrl: NavController,
    public router: ActivatedRoute,
    public statusBar: StatusBar,
    public platform: Platform) {

    this.router.queryParams.subscribe(params => {
      this.token = params['token'];
    })

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.statusBar.backgroundColorByHexString("#6e7bf2");
  }


  register() {
    if (this.company_name == '') {
      this.common.displayAlert('Field Missing', 'All the fields are mandatory, Please fill company_name.');
      return false;
    }
    if (this.email == '') {
      this.common.displayAlert('Field Missing', 'All the fields are mandatory, Please fill email.');
      return false;
    }
    if (this.gst_no == '') {
      this.common.displayAlert('Field Missing', 'All the fields are mandatory, Please fill gst_no.');
      return false;
    }
    if (this.contact_person == '') {
      this.common.displayAlert('Field Missing', 'All the fields are mandatory, Please fill contact_person.');
      return false;
    }
    if (this.phone_no == '') {
      this.common.displayAlert('Field Missing', 'All the fields are mandatory, Please fill phone_no.');
      return false;
    }
    if (this.branch_name == '') {
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

    if (this.activate) {
      if (this.merchant_id == '') {
        this.common.displayAlert('Field Missing', 'All the fields are mandatory, Please fill merchant id.');
        return false;
      }

      if (this.merchant_name == '') {
        this.common.displayAlert('Field Missing', 'All the fields are mandatory, Please fill merchant name.');
        return false;
      }


    }

    let merchant_status = this.activate ? 1 : 0;
    let password = this.email + '@12345'

    this.http.registerClient_web(this.token, this.company_name, this.email, this.gst_no,
      this.contact_person, this.phone_no, this.merchant_id, this.branch_name, this.city,
      this.state, this.country, this.pincode, merchant_status, this.merchant_name, password).subscribe((res) => {
        this.navCtrl.back();
        this.common.displayToast("New client is registered successfully");
      }, err => {
        this.common.displayAlert("Opps!", typeof err == 'object' ? JSON.stringify(err) : err);
      })
  }

}
