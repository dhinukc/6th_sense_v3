import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.page.html',
  styleUrls: ['./edit-client.page.scss'],
})
export class EditClientPage implements OnInit {

  public client_details: ClientDetails;

  activate = false;
  token = '';
  client_id = '';

  company_name = '';
  email = '';
  gst_no = '';
  contact_person = '';
  phone_no = '';
  merchant_id = '';
  merchant_name = '';


  constructor(public common: CommonService,
    public http: HttpServiceService,
    public navCtrl: NavController,
    public router: ActivatedRoute,
    public statusBar: StatusBar,
    public alertCtrl: AlertController,
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

    if (this.platform.is('cordova')) {
      this.http.getCompanyDetails(this.token, this.client_id).subscribe((res) => {
        this.client_details = JSON.parse(res.data) as ClientDetails;

        this.company_name = this.client_details.name;
        this.email = this.client_details.email;
        this.gst_no = this.client_details.gst_no;
        this.contact_person = this.client_details.contact_person;
        this.phone_no = this.client_details.phone_no;
        this.merchant_id = this.client_details.merchant_id;
        this.merchant_name = this.client_details.merchant_name;

        this.activate = (this.client_details.merchant_status == 1) ? true : false;
      })
    } else {
      this.http.getCompanyDetails_web(this.token, this.client_id).subscribe((res) => {
        this.client_details = res as ClientDetails;

        this.company_name = this.client_details.name;
        this.email = this.client_details.email;
        this.gst_no = this.client_details.gst_no;
        this.contact_person = this.client_details.contact_person;
        this.phone_no = this.client_details.phone_no;
        this.merchant_id = this.client_details.merchant_id;
        this.merchant_name = this.client_details.merchant_name;

        this.activate = (this.client_details.merchant_status == 1) ? true : false;
      })
    }
  }




  update() {
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

    this.http.updateCompany_web(this.token, this.client_id, this.company_name, this.email, this.gst_no,
      this.contact_person, this.phone_no, this.merchant_id, merchant_status, this.merchant_name, password).subscribe((res) => {
        if (res == 'success') {
          this.navCtrl.navigateBack(['super-dashboard']);
          this.common.displayToast("Client updated successfully");
        }
      }, err => {
        this.common.displayAlert("Opps!", typeof err == 'object' ? JSON.stringify(err) : err);
      });

  }


  async delete() {
    let alert = await this.alertCtrl.create({
      header: "Are you sure to delete this client ?",
      mode: 'ios',
      buttons: [
        {
          text: "Yes, Delete",
          handler: () => {
            if (this.platform.is('cordova')) {
              let req = this.http.deleteCompany(this.token, this.client_id).subscribe((res) => {
                if (JSON.parse(res.data) == 'success') {
                  this.navCtrl.navigateBack(['super-dashboard']);
                  this.common.displayToast('Client deleted successfully');
                }
                req.unsubscribe();
              })
            } else {
              let req = this.http.deleteCompany_web(this.token, this.client_id).subscribe((res) => {
                if (res == 'success') {
                  this.navCtrl.back();
                  this.common.displayToast('Client deleted successfully');
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

interface ClientDetails {
  _id: string,
  name: string,
  email: string,
  gst_no: string,
  contact_person: string,
  phone_no: string,
  merchant_id: string,
  merchant_name: string,
  merchant_status: 1
}
