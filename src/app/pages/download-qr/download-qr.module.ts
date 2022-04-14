import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadQrPageRoutingModule } from './download-qr-routing.module';

import { DownloadQrPage } from './download-qr.page';

import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadQrPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [DownloadQrPage]
})
export class DownloadQrPageModule {}
