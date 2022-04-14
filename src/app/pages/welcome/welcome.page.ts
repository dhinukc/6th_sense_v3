import { Component, OnInit, ViewChild } from '@angular/core';

import { IonSlides, MenuController, PopoverController, ModalController, NavController, LoadingController, Platform } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ProfilePopupPage } from 'src/app/popup/profile-popup/profile-popup.page';
import { Router } from '@angular/router';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @ViewChild('slides', { static: true }) slides: IonSlides;

  slideOpts = {
    centeredSlides: true,
    spaceBetween: 0,
  };

  loader: any;
  reqid = '';

  public machineStatus: MachineStatus;
  public machineStatusByMachineId: any;
  public vendingRes: VendingRes;
  public machineId: any = '';
  paymentType: "QR_CODE" | "MACHINE_ID" = "QR_CODE";


  constructor(
    private barcodeScanner: BarcodeScanner,
    private menuCtrl: MenuController,
    public popover: PopoverController,
    public modalCtrl: ModalController,
    public router: Router,
    public navCtrl: NavController,
    public intent: WebIntent,
    public common: CommonService,
    public http: HttpServiceService,
    public loadingCtrl: LoadingController,
    public platform: Platform) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.slides.startAutoplay();
  }

  scanQRcode() {

    this.barcodeScanner.scan().then(async (barcodeData) => {
      this.loader = await this.loadingCtrl.create({
        message: 'Fetching data...'
      });
      this.loader.present();

      let qr_data = this.getJsonData(barcodeData.text);

      if (barcodeData.cancelled == true) {
        this.loader.dismiss();
        return
      }

      if (barcodeData.format != 'QR_CODE') {
        this.common.displayAlert('Invalid QR Code', 'Please scan a valid QR Code');
        this.loader.dismiss();
        return
      }

      this.reqid = this.makeReqId(7);
      //this.http.getMachineStatus(data.machine_id, this.reqid) // old api call
      this.http.getMachineStatusByMachineId(qr_data.machine_id, this.reqid).subscribe((res) => {
        this.machineStatus = res as MachineStatus;

        if (this.machineStatus.Status != 'online') {
          this.loader.dismiss();
          this.common.displayAlert("Offline", "Sorry! Machine went offline");
          return false;
        }

        if (+this.machineStatus.Stock1 <= 0) {
          this.loader.dismiss();
          this.common.displayAlert("No Stock Available", "Sorry! No stock available in this machine");
          return false;
        }

        if (this.machineStatus.Stock1 == "E") {
          this.loader.dismiss();
          this.common.displayAlert("Oops!", "Sorry! There is some machine error, please try again later");
          return false;
        }

        // this.loader.dismiss();
        // let trId = this.makeid(7);

        // let paymentUrl = `upi://pay?pa=${data.vpa}&pn=${data.vpa_name}&tid=${trId}&tr=${trId}&am=${this.machineStatus.Price1}&cu=INR&tn=Surfon`;
        // this.upi(data.machine_id, data._id, this.reqid, data.vpa, data.vpa_name, this.machineStatus.Price1, paymentUrl);

        this.loader.dismiss();
        let trId = this.makeid(7);
        let data = this.getJsonData(this.machineStatus.Payment_URL);

        // let paymentUrl = `upi://pay?pa=6380@uboi&pn=6%20th%20Sense%20Innovations&tid=${trId}&tr=${trId}&am=1.00&cu=INR&tn=Surfon`;

        let paymentUrl = `upi://pay?pa=${data.vpa}&pn=${data.vpa_name}&tid=${trId}&tr=${trId}&am=${this.machineStatus.Price1}&cu=INR&tn=Surfon`;

        this.upi(this.machineStatus.MacID, this.machineStatus.MacID, this.reqid, data.vpa, data.vpa_name, this.machineStatus.Price1, paymentUrl);

      }, err => {
        this.loader.dismiss();
        this.common.displayAlert('No internet', JSON.stringify(err));
        return
      })


    }, err => {
      this.loader.dismiss();
      this.common.displayAlert('Invalid QR Code', 'Please scan a valid QR Code');
    })
  }


  async payByMachineId() {
    this.loader = await this.loadingCtrl.create({
      message: 'Fetching data...'
    });
    this.loader.present();

    this.reqid = this.makeReqId(7);

    this.http.getMachineStatusByMachineId(this.machineId, this.reqid).toPromise().then((res) => {
      this.machineStatus = res as MachineStatus;

      if (this.machineStatus.Status && this.machineStatus.Status != 'online') {
        this.loader.dismiss();
        this.common.displayAlert("Offline", "Sorry! Machine went offline");
        return false;
      }

      if (this.machineStatus.Stock1 && +this.machineStatus.Stock1 <= 0) {
        this.loader.dismiss();
        this.common.displayAlert("No Stock Available", "Sorry! No stock available in this machine");
        return false;
      }

      if (this.machineStatus.Stock1 && this.machineStatus.Stock1 == "E") {
        this.loader.dismiss();
        this.common.displayAlert("Oops!", "Sorry! There is some machine error, please try again later");
        return false;
      }

      if (this.machineStatus.response && this.machineStatus.response == "invalid") {
        this.loader.dismiss();
        this.common.displayAlert("Invalid Machine ID", "Please enter a valid Machine ID");
        this.machineId = "";
        return false;
      }

      this.loader.dismiss();
      let trId = this.makeid(7);
      let data = this.getJsonData(this.machineStatus.Payment_URL);

      // let paymentUrl = `upi://pay?pa=6380@uboi&pn=6%20th%20Sense%20Innovations&tid=${trId}&tr=${trId}&am=1.00&cu=INR&tn=Surfon`;

      let paymentUrl = `upi://pay?pa=${data.vpa}&pn=${data.vpa_name}&tid=${trId}&tr=${trId}&am=${this.machineStatus.Price1}&cu=INR&tn=Surfon`;

      this.upi(this.machineStatus.MacID, this.machineStatus.MacID, this.reqid, data.vpa, data.vpa_name, this.machineStatus.Price1, paymentUrl);

    }, err => {
      this.loader.dismiss();
      this.common.displayAlert('No internet', JSON.stringify(err));
      return
    })
  }

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getJsonData(query) {
    let arrayOfKeyValues = query.split(',');
    let modifiedArray = new Array();
    console.log(arrayOfKeyValues);
    for (let i = 0; i < arrayOfKeyValues.length; i++) {
      let arrayValues = arrayOfKeyValues[i].split(':');
      let arrayString = `"${arrayValues[0].replace('{', '').trim()}":"${arrayValues[1].replace('}', '').trim()}"`;
      modifiedArray.push(arrayString);
    }
    let jsonDataString = `{${modifiedArray.toString()}}`;
    let jsonData = JSON.parse(jsonDataString);
    console.log(jsonData);
    console.log(typeof jsonData);
    return jsonData;
  }


  makeReqId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  upi(machine_id, machine_db_id, reqid, vpa, vpa_name, price, url) {

    (window as any).plugins.intentShim.startActivityForResult(
      {
        action: this.intent.ACTION_VIEW,
        url: url,
        requestCode: 1
      }, async onSuccess => {
        console.log("Success", onSuccess);
        //this.toastService.toastBottom(‘ Payment Successfully done.’);
        let response = JSON.parse('{"' + (onSuccess.extras.response).replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        let status = (response.Status).toLowerCase();

        if (status == 'success') {

          this.loader = await this.loadingCtrl.create({
            message: "Processing...",
          });
          this.loader.present();

          this.http.vendProduct(machine_id, reqid).toPromise().then(async (res) => {
            this.vendingRes = res as VendingRes;
            if (this.vendingRes.process == "invalid" || this.vendingRes.process == "failed") {
              this.loader.dismiss();
              this.loader = null;
              this.common.displayAlert("Oops!", "Sorry, Vending stoped due to some issue, Your amount will be credited back within 7 working days.");

              this.http.registerTransaction(machine_id, machine_db_id, reqid, vpa, vpa_name, price, 'failed').toPromise().then((res) => {
                //Nothing
              }, err => {
                //alert("Error in storing transaction history: " + err);
              });
              return;
            }

            setTimeout(() => {
              this.loader.dismiss();
              this.loader = null;
              this.recheckVendingStatus(machine_id, machine_db_id, reqid, vpa, vpa_name, price);
            }, 7000)

          }, err => {
            this.common.displayAlert("Something went wrong!", typeof err == "object" ? JSON.stringify(err) : err);
          })
        } else {
          this.common.displayAlert("Oops!", "Payment failed.");
        }
      }, err => {
        this.common.displayAlert("No UPI App found!", "Looks like no UPI supported application installed. Please install one to continue.");
      });

  }


  async recheckVendingStatus(machine_id, machine_db_id, reqid, vpa, vpa_name, price) {
    await this.http.vendProduct(machine_id, reqid).toPromise().then(async (res) => {
      this.vendingRes = res as VendingRes;

      if (!this.loader) {
        this.loader = await this.loadingCtrl.create({
          message: "Vending...",
        });
        this.loader.present();
      }

      if (this.vendingRes.process == 'success' || this.vendingRes.process == 'Success' || this.vendingRes.process == 'SUCCESS') {
        this.loader.dismiss();
        this.loader = null;
        this.common.displayAlert("Thank You!", "Collect your product");
        this.http.registerTransaction(machine_id, machine_db_id, reqid, vpa, vpa_name, price, 'success').subscribe((res) => {
          //nothing
        }, err => {
          // alert("Error in storing transaction history: " + err);
        });
      } else if (this.vendingRes.process == "invalid" || this.vendingRes.process == "failed") {
        this.loader.dismiss();
        this.loader = null;
        this.common.displayAlert("Oops!", "Sorry, Vending stoped due to some issue, Your amount will be credited back within 7 working days.");
        this.http.registerTransaction(machine_id, machine_db_id, reqid, vpa, vpa_name, price, 'failed').toPromise().then((res) => {
          //nothing
        }, err => {
          //alert("Error in storing transaction history: " + err);
        });
      } else if (this.vendingRes.process == 'vending') {
        setTimeout(() => {
          this.recheckVendingStatus(machine_id, machine_db_id, reqid, vpa, vpa_name, price);
        }, 5000);
      } else {
        this.loader.dismiss();
        this.loader = null;
      }


    })
  }

  async profilePopup(ev) {
    let popover = await this.popover.create({
      component: ProfilePopupPage,
      event: ev,
      translucent: true,
      mode: 'ios'
    });

    await popover.present();
    await popover.onDidDismiss().then(async (data) => {
      if (data.role == 'selected') {
        //this.router.navigate(['/login']);
        this.navCtrl.navigateForward(['login']);
      }
    })
  }

  changePaymentType() {
    this.paymentType = this.paymentType == "QR_CODE" ? "MACHINE_ID" : "QR_CODE";
  }

}

interface MachineStatus {
  ReqID?: string,
  MacID?: string,
  Stock1?: string,
  Price1?: string,
  Status?: string,
  Payment_URL?: string,
  response?: string
}

interface VendingRes {
  process: string
}
