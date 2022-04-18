import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { from } from 'rxjs';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { saveAs } from 'file-saver';
import { PhotoLibrary } from '@awesome-cordova-plugins/photo-library/ngx';
import { CommonService } from 'src/app/services/common/common.service';

declare var cordova;
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
    private fileTransfer: FileTransfer,
    private photoLibrary: PhotoLibrary,
    private commonService: CommonService) {

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
    const imageData = canvas.toDataURL('image/png');
    //const imageDataString = canvas.toDataURL('image/png').toString();
    //const base64 = this.getBase64Image(document.getElementById('canvas'));

    this.photoLibrary.requestAuthorization({ read: true, write: true }).then(() => {
      this.photoLibrary.saveImage(imageData, this.machine_id).then(async(success) => {
        this.commonService.displayToast("Image saved to your photo library");
      }, (err) => {
        //alert(`Error ----> ${typeof err == "object" ? JSON.stringify(err) : err}`);
      })
    });
  }

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
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
