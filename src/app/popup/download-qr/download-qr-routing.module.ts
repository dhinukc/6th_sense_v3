import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadQrPage } from './download-qr.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadQrPageRoutingModule {}
