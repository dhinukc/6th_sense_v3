import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public tempClientList: ClientList[];

  public colorArray = [
    'C58E26',
    'F52D20',
    '2703A0',
    '611DB9',
    '433D4B',
    '33A405',
    '0574A4',
    'F42626',
    '35025D',
    '90A908',
    'FF5E0D',
    'A81DC1',
    '900C3F',
    'B7126A',
    'FFC300',
    '268D53',
    '466D57',
    'E53D70',
    'F3DB0F',
    'F3650F',
    '0F9DF3',
    'C2004C',
    '1DC200',
    'C2000C',
    '3E3B3B',
    '1A6A7E'
  ]

  public clients: Array<{ name: string, letter: string, id: string, merchant_id: string, merchant_status: number, merchant_name: string }>
  public dealers: Array<{ name: string, letter: string, id: string }>
  public token = '';

  constructor(public router: Router,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public storage: Storage,
    public http: HttpServiceService,
    public platform: Platform,
    public statusBar: StatusBar
  ) {



    this.dealers = [
      // { name: 'Accenture', letter: '', id: '' },
      // { name: 'Tata Consultancy', letter: '', id: '' },
      // { name: 'McAfee', letter: '', id: '' },
      // { name: 'JP Morgan', letter: '', id: '' },
      // { name: 'HP', letter: '', id: '' },
      // { name: 'Infosys', letter: '', id: '' },
      // { name: 'Happiest Mind', letter: '', id: '' },



      // { name: 'Accenture', letter: '', id: '' },
      // { name: 'Tata Consultancy', letter: '', id: '' },
      // { name: 'McAfee', letter: '', id: '' },
      // { name: 'JP Morgan', letter: '', id: '' },
      // { name: 'HP', letter: '', id: '' },
      // { name: 'Infosys', letter: '', id: '' },
      // { name: 'Happiest Mind', letter: '', id: '' },
      // { name: 'Accenture', letter: '', id: '' },
      // { name: 'Tata Consultancy', letter: '', id: '' },
      // { name: 'McAfee', letter: '', id: '' },
      // { name: 'JP Morgan', letter: '', id: '' },

    ]
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.statusBar.backgroundColorByHexString("#ffffff");
    this.menuCtrl.enable(true);

    this.clients = [];
    this.tempClientList = [];

    this.storage.get('token').then(res => {
      this.token = res;

      if (this.platform.is('cordova')) {
        this.http.getCompanyList(this.token).subscribe((res) => {
          
          
          this.tempClientList = JSON.parse(res.data) as Array<ClientList>;
          this.tempClientList.forEach(element => {
            this.clients.push({ name: element.name, letter: '', id: element._id, merchant_id: element.merchant_id, merchant_status: element.merchant_status, merchant_name: element.merchant_name });
          });
          this.getRandomColor();
        })
      } else {
        this.http.getCompanyList_web(this.token).subscribe((res) => {
          this.tempClientList = res as Array<ClientList>;
          this.tempClientList.forEach(element => {
            this.clients.push({ name: element.name, letter: '', id: element._id, merchant_id: element.merchant_id, merchant_status: element.merchant_status, merchant_name: element.merchant_name });
          });
          this.getRandomColor();
        })
      }


    })



    for (let i = 0; i < this.dealers.length; i++) {
      let alpha = this.dealers[i].name.charAt(0).toLowerCase();
      this.dealers[i].letter = alpha.toUpperCase();

      var color = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
      //console.log('color--> '+color);

      document.getElementById('circleDealerDiv' + i).style.backgroundColor = '#' + color;
    }
  }


  getRandomColor() {

    setTimeout(() => {
      for (let i = 0; i < this.clients.length; i++) {
        let alpha = this.clients[i].name.charAt(0).toLowerCase();
        this.clients[i].letter = alpha.toUpperCase();
        console.log("First Letter: ", alpha);

        var color = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
        //console.log('color--> '+color);

        document.getElementById('circleDiv' + i).style.backgroundColor = '#' + color;
      }
    }, 100)

  }


  getBranches(client) {
    //this.navCtrl.navigateForward(['login']);
    //alert(client.merchant_id)
    let navigationextras: NavigationExtras = {
      queryParams: {
        client_name: client.name,
        client_id: client.id,
        token: this.token,
        vpa: client.merchant_id,
        vpa_status: client.merchant_status,
        vpa_name: client.merchant_name
      }
    }
    this.navCtrl.navigateForward(['branches'], navigationextras);
  }


  createClients() {
    let navigationextras: NavigationExtras = {
      queryParams: {
        token: this.token
      }
    }
    this.navCtrl.navigateForward(['register-clients'], navigationextras);
  }

}


interface ClientList {
  _id: string,
  name: string,
  email: string,
  gst_no: string,
  contact_person: string,
  phone_no: string,
  merchant_id: string,
  merchant_name: string,
  merchant_status: number,
  password: string,
  creationDate: string,
  modificaitonDate: string,
}
