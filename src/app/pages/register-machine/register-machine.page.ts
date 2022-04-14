import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { CommonService } from 'src/app/services/common/common.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-register-machine',
  templateUrl: './register-machine.page.html',
  styleUrls: ['./register-machine.page.scss'],
})
export class RegisterMachinePage implements OnInit {

  client_id = "";
  branch_id = "";
  token = "";
  client_name = '';
  branch_name = '';

  machine_id = '';
  capacity = '';

  thisMonth;
  year;
  machineStaticId;

  constructor(public navCtrl: NavController,
    public router: ActivatedRoute,
    public http: HttpServiceService,
    public common: CommonService,
    public statusBar: StatusBar,
    public platform: Platform) {

    this.router.queryParams.subscribe(params => {
      this.client_id = params['client_id'];
      this.branch_id = params['branch_id'];
      this.token = params['token'];
      this.client_name = params['client_name'];
      this.branch_name = params['branch_name'];
    })

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.statusBar.backgroundColorByHexString("#6e7bf2");

    var months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    var now = new Date();
    this.thisMonth = months[now.getMonth()];
    //alert(thisMonth);
    this.year = new Date().getFullYear().toString().slice(2);

    this.machineStaticId = 'SURF' + this.year + this.thisMonth;

  }


  register() {
    if (this.machine_id == '') {
      this.common.displayAlert('Field Missing', 'All the fields are importent, Please enter machine id.');
      return false;
    }

    if (this.capacity == '') {
      this.common.displayAlert('Field Missing', 'All the fields are importent, Please enter machine capacity.');
      return false;
    }

    let middleZeros = '';
    for (let i = 0; i < 20 - (this.machineStaticId.length + this.machine_id.length); i++) {
      middleZeros = middleZeros + "0";
    }


    this.http.registerMachine_web(this.token, this.client_id, this.branch_id, this.machineStaticId, middleZeros, this.machine_id, this.capacity).subscribe((res) => {
      this.navCtrl.back();
      this.common.displayToast("New machine is added successfully");
    }, err => {
      this.common.displayAlert("Opps!", typeof err == 'object' ? JSON.stringify(err) : err);
    });

  }


}
