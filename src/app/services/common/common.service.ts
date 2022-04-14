import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private loader: any;
  private isDisplayingLoader: boolean = false;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) { }


  async displayLoader(message) {
    if (this.isDisplayingLoader == false) {
        this.isDisplayingLoader = true;
        this.loader = await this.loadingCtrl.create({
            message: message
        });
        this.loader.present();
    } else { //Dismissing an already present loader.
        //console.log("Already a loader is present");
        this.dismissLoader();
        this.displayLoader(message);
    }
}

dismissLoader() {

    if (this.isDisplayingLoader == true && this.loader != null) {
        this.isDisplayingLoader = false;
        this.loader.dismiss();
    }
}

async displayAlert(title, message) {
    let alert = await this.alertCtrl.create({
        header: title,
        message: message,
        buttons: ['Ok'],
        mode: 'ios'
    });
    alert.present();
}

async displayNoNetworkAlert() {
    let alert = await this.alertCtrl.create({
        header: "Check",
        message: "You are offline. Please check your network.",
        buttons: ['Ok']
    });
    alert.present();
}

async displayToast(message) {
    let toast = await this.toastCtrl.create({
        message: message,
        duration: 3000
    });
    toast.present();
}
}
