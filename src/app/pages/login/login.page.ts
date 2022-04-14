import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { CommonService } from 'src/app/services/common/common.service';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username;
  public password;
  public loginData: LoginData;

  constructor(
    public router: Router,
    public navCtrl: NavController,
    public http: HttpServiceService,
    public common: CommonService,
    public storage: Storage,
    public nativeHttp: HTTP,
    public platform: Platform
  ) { }

  ngOnInit() {
  }

  login() {


    if (this.platform.is('cordova')) {
      let req = this.http.login(this.username, this.password).subscribe((res) => {
        //alert('android');
        this.loginData = JSON.parse(res.data) as LoginData;

        this.storage.set('user_data', this.loginData);
        this.storage.set('token', this.loginData.token);
        this.navCtrl.navigateForward(['super-dashboard']);
        req.unsubscribe();

      }, err => {
        //alert('Err: '+JSON.stringify(err));
        this.common.displayAlert('Invalid User', 'username or password is invalid');
      });
    } else {
      let req = this.http.login_web(this.username, this.password).subscribe((res) => {

        this.loginData = res as LoginData;

        this.storage.set('user_data', this.loginData);
        this.storage.set('token', this.loginData.token);
        this.navCtrl.navigateForward(['super-dashboard']);
        req.unsubscribe();

      }, err => {
        //alert(JSON.stringify(err));
        this.common.displayAlert('Invalid User', 'username or password is invalid');
      });
    }


  }

}

interface LoginData {
  _id: string,
  email: string,
  firstName: string,
  lastName: string,
  mobile: string,
  accountType: string,
  role: string,
  creationDate: string,
  status: string,
  hash: string,
  modificaitonDate: string,
  token: string
}
