import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MachinesPageRoutingModule } from './machines-routing.module';

import { MachinesPage } from './machines.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { DownloadQrPage } from 'src/app/popup/download-qr/download-qr.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MachinesPageRoutingModule,
    NgxQRCodeModule
  ],
  entryComponents: [DownloadQrPage],
  declarations: [MachinesPage, DownloadQrPage]
})
export class MachinesPageModule {}
