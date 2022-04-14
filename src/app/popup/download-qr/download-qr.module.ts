import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadQrPageRoutingModule } from './download-qr-routing.module';

//import { DownloadQrPage } from './download-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadQrPageRoutingModule
  ],
  //declarations: [DownloadQrPage]
})
export class DownloadQrPageModule {}
