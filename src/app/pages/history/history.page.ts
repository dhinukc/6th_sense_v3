import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  token = '';
  _id = '';
  machine_id = ''

  public history: HistoryData[] = [];

  constructor(public nav: NavController,
    public router: ActivatedRoute,
    public http: HttpServiceService,
    public common: CommonService,
    public platform: Platform) {

    this.router.queryParams.subscribe(params => {
      this._id = params['_id'];
      this.token = params['token'];
      this.machine_id = params['machine_id'];

    });


  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.history = [];
    if (this.platform.is('cordova')) {
      this.http.getHistory(this.token, this.machine_id).subscribe((res) => {
        this.history = JSON.parse(res.data) as Array<HistoryData>;
      })
    } else {
      this.http.getHistory_web(this.token, this.machine_id).subscribe((res) => {
        this.history = res as Array<HistoryData>;
      })
    }
  }

}


interface HistoryData {
  _id: string,
  vpa: string,
  price: string,
  txnRef: string,
  vpa_name: string,
  machine_code: string,
  status: string,
  creationDate: string,
  modificaitonDate: string,
}
