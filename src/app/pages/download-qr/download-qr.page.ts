import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { from } from 'rxjs';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-download-qr',
  templateUrl: './download-qr.page.html',
  styleUrls: ['./download-qr.page.scss'],
})
export class DownloadQrPage implements OnInit {

  client_id = '';
  branch_id = '';
  token = '';
  client_name = '';
  branch_name = '';
  vpa = '';
  custome_vpa = '';
  vpa_status = 0;
  machine_id = '';
  machine_db_id = '';
  vpa_name = '';
  machineStaticId = '';
  middleZeros = '';

  qr_value = '';
  elementType = NgxQrcodeElementTypes.CANVAS;
  qrCodeCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  vpa_radio = true;
  custome_vpa_radio = false;
  selected_mode: 'vpa' | 'custome_vpa' = 'vpa';

  constructor(public router: ActivatedRoute,
    public navCtrl: NavController,
    public base64ToGallery: Base64ToGallery,
    public toastCtrl: ToastController,
    private file: File,
    private permission: AndroidPermissions,
    private fileTransfer: FileTransfer) {

    this.router.queryParams.subscribe(params => {
      this.client_id = params['client_id'];
      this.branch_id = params['branch_id'];
      this.token = params['token'];
      this.client_name = params['client_name'];
      this.branch_name = params['branch_name'];
      this.vpa = params['vpa'];
      this.vpa_status = params['vpa_status'];
      this.machine_id = params['machine_id'];
      this.machine_db_id = params['machine_db_id'];
      this.vpa_name = params['vpa_name'];
      this.machineStaticId = params['machineStaticId'];
      this.middleZeros = params['middleZeros'];


    });


  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.qr_value = "machine_id:" + this.machine_id + ",_id:" + this.machine_db_id + ",vpa:" + this.vpa + ",vpa_name:" + this.vpa_name;
    //alert(this.qr_value)
  }


  downloadQR() {

    const element = document.getElementById('canvas');
    const canvas = element.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/png').toString();

    //console.log(imageData);

    let data = imageData.split(',')[1];
    //console.log(data);

    //let blob = this.b64toBlob(data, 'image/png');

      this.permission.checkPermission(this.permission.PERMISSION.READ_EXTERNAL_STORAGE).then((res) => {
        if (res.hasPermission) {
          this.base64ToGallery.base64ToGallery(data,
            { prefix: this.machine_id, mediaScanner: true })
            .then(async res => {
              let toast = await this.toastCtrl.create({
                header: "QR Code save in your photogallery",
                duration: 5000
              });
              toast.present();
            });
        } else {
          this.permission.requestPermission(this.permission.PERMISSION.READ_EXTERNAL_STORAGE);
        }
      }, err => {
        this.permission.requestPermissions([this.permission.PERMISSION.READ_EXTERNAL_STORAGE, this.permission.PERMISSION.WRITE_EXTERNAL_STORAGE]);
      })

    // alert(this.file.externalRootDirectory)
    // this.file.checkDir(this.file.externalRootDirectory, 'Surfone')
    //     .then(_ => {
    //       this.file.writeFile(this.file.externalRootDirectory + 'Surfone/', this.machine_id + '.png', blob).then(async response => {
    //         // ACTION
    //         alert(typeof response == "object" ? JSON.stringify(response) : response);
    //         let toast = await this.toastCtrl.create({
    //           header: "QR Code saved in your photogallery",
    //           duration: 5000
    //         });
    //         toast.present();
    //        // this.download(response.nativeURL);
    //       }).catch(err => {
    //         // ACTION
    //         this.file.removeFile(this.file.externalRootDirectory + 'Surfone/', this.machine_id + '.png').then(()=> {
    //           this.downloadQR();
    //         })
    //         //alert(typeof err == 'object' ? JSON.stringify(err) : err);
    //       })
    //     })
    //     .catch(err => {
    //       this.file.createDir(this.file.externalRootDirectory, 'Surfone', false).then(result => {
    //         this.file.writeFile(this.file.externalRootDirectory + 'Surfone/', this.machine_id + '.png', blob).then(async response => {
    //           // ACTION
    //           let toast = await this.toastCtrl.create({
    //             header: "QR Code save in your photogallery",
    //             duration: 5000
    //           });
    //           toast.present();
    //         }).catch(err => {
    //           // ACTION
    //         })
    //       })
    //     });



  }

  download() {
    this.permission.checkPermission(this.permission.PERMISSION.READ_EXTERNAL_STORAGE).then((res) => {
      if (res.hasPermission) {
        // this.fileTransfer.create().download(imageLocation, this.file.externalRootDirectory).then((entry)=> {
        //   alert(entry)
        // }).catch(err=> {
        //   alert(typeof err == "object" ? JSON.stringify(err) : err);
        // })
      } else {
        this.permission.requestPermission(this.permission.PERMISSION.READ_EXTERNAL_STORAGE);
      }
    }, err => {
      this.permission.requestPermissions([this.permission.PERMISSION.READ_EXTERNAL_STORAGE, this.permission.PERMISSION.WRITE_EXTERNAL_STORAGE]);
    })

  }


  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  selectMerchantOption(val) {
    switch (val) {
      case "vpa":
        this.vpa_radio = true;
        this.custome_vpa_radio = false;
        this.qr_value = "machine_id:" + this.machine_id + ",_id:" + this.machine_db_id + ",vpa:" + this.vpa + ",vpa_name:" + this.vpa_name;
        break;

      case "custome_vpa":
        this.vpa_radio = false;
        this.custome_vpa_radio = true;
        this.qr_value = "machine_id:" + this.machine_id + ",_id:" + this.machine_db_id + ",vpa:" + this.custome_vpa + ",vpa_name:" + this.vpa_name;
        break;
    }
  }

  changeQR() {
    this.qr_value = "machine_id:" + this.machine_id + ",_id:" + this.machine_db_id + ",vpa:" + this.custome_vpa + ",vpa_name:" + this.vpa_name;
  }

}
