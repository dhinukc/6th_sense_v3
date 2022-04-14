import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-download-qr',
  templateUrl: './download-qr.page.html',
  styleUrls: ['./download-qr.page.scss'],
})
export class DownloadQrPage implements OnInit {

  constructor(public popover: PopoverController) { }

  ngOnInit() {
  }

  select() {
    this.popover.dismiss('admin', 'selected');
  }

}
