import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  //base_url = 'https://sense.blogbeats.me/v1/';
  base_url = 'http://13.233.141.202:4000/';
  base_url_native = 'https://surfon.live/v1/';

  machine_url = 'http://www.machineslive.com/mlive/';
  machine_api_key = 'abcdefghijklmnop123456789123456789';


  constructor(public http: HttpClient, public nativeHttp: HTTP, public platform: Platform) { }



  login(email, password) {

    let body = {
      "email": email,
      "password": password
    }

    let nativeCall = this.nativeHttp.post(
      this.base_url + "users/authenticate", //Url
      body, // body data
      { 'Content-Type': 'application/json' } // header
    );

    return from(nativeCall).pipe()
  }

  login_web(email, password) {

    let body = {
      "email": email,
      "password": password
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.base_url + "users/authenticate", body, { headers: headers });
  }


  getCompanyList(token) {
    let body = {}

    let nativeCall = this.nativeHttp.post(
      this.base_url_native + "company", // Url
      body, // body data
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token
      } // header
    );

    return from(nativeCall).pipe();
  }


  getCompanyList_web(token) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token
    });
    let body = {}
    return this.http.post(this.base_url + "company", body, { headers: headers });
  }


  getBranchList(token, company) {
    let body = {
      'company': company
    }

    let nativeCall = this.nativeHttp.post(
      this.base_url_native + "branch", // Url
      body, // body data
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token
      } // header
    );

    return from(nativeCall).pipe();
  }

  getBranchList_web(token, company) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token
    });
    let body = {
      'company': company
    }
    return this.http.post(this.base_url + "branch", body, { headers: headers });
  }


  getMachineList(token, company, branch) {

    let body = {
      'company': company,
      'branch': branch
    }

    let nativeCall = this.nativeHttp.post(
      this.base_url_native + "machineallocation", // Url
      body, // body data
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token
      } // header
    );
    return from(nativeCall).pipe();
  }

  getMachineList_web(token, company, branch) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token
    });

    let body = {
      'company': company,
      'branch': branch
    }
    return this.http.post(this.base_url + "machineallocation", body, { headers: headers });
  }

  registerBranch(token, company, name, city, state, country, pincode) {

    let body = {
      'company': company,
      'name': name,
      'city': city,
      'state': state,
      'country': country,
      'pincode': pincode
    }

    let nativeCall = this.nativeHttp.post(
      this.base_url_native + "branch/register", // Url
      body, // body data
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token
      } // header
    );
    return from(nativeCall).pipe();
  }

  registerBranch_web(token, company, name, city, state, country, pincode) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token
    });
    let body = {
      'company': company,
      'name': name,
      'city': city,
      'state': state,
      'country': country,
      'pincode': pincode
    }
    return this.http.post(this.base_url + "branch/register", body, { headers: headers });
  }



  registerClient(token, company_name, email, gst_no, contact_person, phone_no, merchant_id, branch_name, city, state, country, pincode, merchant_status, merchant_name, password) {
    let body = {
      'company': {
        'name': company_name,
        'email': email,
        'gst_no': gst_no,
        'contact_person': contact_person,
        'phone_no': phone_no,
        'merchant_id': merchant_id,
        'merchant_status': merchant_status,
        'merchant_name': merchant_name,
        'password': password
      },
      'branch': {
        'name': branch_name,
        'city': city,
        'state': state,
        'country': country,
        'pincode': pincode
      }

    }

    let nativeCall = this.nativeHttp.post(
      this.base_url_native + "company/register", // Url
      body, // body data
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token
      } // header
    );
    return from(nativeCall).pipe();
  }

  registerClient_web(token, company_name, email, gst_no, contact_person, phone_no, merchant_id, branch_name, city, state, country, pincode, merchant_status, merchant_name, password) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token
    });
    let body = {
      'company': {
        'name': company_name,
        'email': email,
        'gst_no': gst_no,
        'contact_person': contact_person,
        'phone_no': phone_no,
        'merchant_id': merchant_id,
        'merchant_status': merchant_status,
        'merchant_name': merchant_name,
        'password': password
      },
      'branch': {
        'name': branch_name,
        'city': city,
        'state': state,
        'country': country,
        'pincode': pincode
      }

    }
    return this.http.post(this.base_url + "company/register", body, { headers: headers });
  }


  registerMachine(token, company, branch, machineStaticId, middleZeros, machine_id, capacity) {

    let body = {
      'company': company,
      'branch': branch,
      'machine_static_id': machineStaticId,
      'middle_zeros': middleZeros,
      'machine_id': machine_id,
      'capacity': capacity,
    }

    let nativeCall = this.nativeHttp.post(
      this.base_url_native + "machineallocation/register", // Url
      body, // body data
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token
      } // header
    );

    return from(nativeCall).pipe();
  }

  registerMachine_web(token, company, branch, machineStaticId, middleZeros, machine_id, capacity) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token
    });
    let body = {
      'company': company,
      'branch': branch,
      'machine_static_id': machineStaticId,
      'middle_zeros': middleZeros,
      'machine_id': machine_id,
      'capacity': capacity,
    }

    return this.http.post(this.base_url + "machineallocation/register", body, { headers: headers });
  }


  getCompanyDetails(token, company) {

    let body = {}

    let nativeCall = this.nativeHttp.get(
      this.base_url_native + "company/" + company, // Url
      body, // body data
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token
      } // header
    );

    return from(nativeCall).pipe();

    //return this.http.get(this.base_url + "company/" + company, { headers: headers });
  }


  getCompanyDetails_web(token, company) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token
    });
    let body = {}

    return this.http.get(this.base_url + "company/" + company, { headers: headers });
  }


  updateCompany(token, company, company_name, email, gst_no, contact_person, phone_no, merchant_id, merchant_status, merchant_name, password) {

    let body = { '_id': company, 'name': company_name, 'email': email, 'gst_no': gst_no, 'contact_person': contact_person, 'phone_no': phone_no, 'merchant_id': merchant_id, 'merchant_status': merchant_status, 'merchant_name': merchant_name, 'password': password }

    let nativeCall = this.nativeHttp.put(
      this.base_url_native + "company/", // Url
      body, // body data
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token
      } // header
    );

    return from(nativeCall).pipe();
  }


  updateCompany_web(token, company, company_name, email, gst_no, contact_person, phone_no, merchant_id, merchant_status, merchant_name, password) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.put(this.base_url + "company/", { '_id': company, 'name': company_name, 'email': email, 'gst_no': gst_no, 'contact_person': contact_person, 'phone_no': phone_no, 'merchant_id': merchant_id, 'merchant_status': merchant_status, 'merchant_name': merchant_name, 'password': password }, { headers: headers });
  }



  deleteCompany(token, company) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token
    });

    let body = {}

    let nativeCall = this.nativeHttp.delete(
      this.base_url_native + "company/" + company, // Url
      body, // body data
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token
      } // header
    );

    return from(nativeCall).pipe();

  }

  deleteCompany_web(token, company) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token
    });

    let body = {}

    return this.http.delete(this.base_url + "company/" + company, { headers: headers });
  }



  getBranchDetails(token, branch) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token
    });
    let body = {}

    let nativeCall = this.nativeHttp.get(
      this.base_url_native + "branch/" + branch, // Url
      body, // body data
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token
      } // header
    );

    return from(nativeCall).pipe();

  }


  getBranchDetails_web(token, branch) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token
    });
    let body = {}

    return this.http.get(this.base_url + "branch/" + branch, { headers: headers });
  }


  getMachineDetails(token, machine) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token
    });
    let body = {}

    let nativeCall = this.nativeHttp.get(
      this.base_url_native + "machineallocation/" + machine, // Url
      body, // body data
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token
      } // header
    );

    return from(nativeCall).pipe();

  }


  getMachineDetails_web(token, machine) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token
    });
    let body = {}

    return this.http.get(this.base_url + "machineallocation/" + machine, { headers: headers });
  }



  updateBranch(token, branch, branch_name, city, state, country, pincode) {

    let body = { '_id': branch, 'name': branch_name, 'city': city, 'state': state, 'country': country, 'pincode': pincode }

    let nativeCall = this.nativeHttp.put(
      this.base_url_native + "branch/", // Url
      body, // body data
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token
      } // header
    );

    return from(nativeCall).pipe();

  }


  updateBranch_web(token, branch, branch_name, city, state, country, pincode) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.put(this.base_url + "branch/", { '_id': branch, 'name': branch_name, 'city': city, 'state': state, 'country': country, 'pincode': pincode }, { headers: headers });
  }


  updateMachine(token, machine, machine_id, capacity) {

    let body = { '_id': machine, 'machine_id': machine_id, 'capacity': capacity, }

    let nativeCall = this.nativeHttp.put(
      this.base_url_native + "machineallocation/", // Url
      body, // body data
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token
      } // header
    );

    return from(nativeCall).pipe();

  }


  updateMachine_web(token, machine, machine_id, capacity) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.put(this.base_url + "machineallocation/", { '_id': machine, 'machine_id': machine_id, 'capacity': capacity, }, { headers: headers });
  }



  deleteBranch(token, branch) {

    let body = {}

    let nativeCall = this.nativeHttp.delete(
      this.base_url_native + "branch/" + branch, // Url
      body, // body data
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token
      } // header
    );

    return from(nativeCall).pipe();
  }


  deleteBranch_web(token, branch) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token
    });

    let body = {}
    return this.http.delete(this.base_url + "branch/" + branch, { headers: headers });
  }


  deleteMachine(token, machine) {
    let body = {}

    let nativeCall = this.nativeHttp.delete(
      this.base_url_native + "machineallocation/" + machine, // Url
      body, // body data
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token
      } // header
    );

    return from(nativeCall).pipe();
  }


  deleteMachine_web(token, machine) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token
    });

    let body = {}
    return this.http.delete(this.base_url + "machineallocation/" + machine, { headers: headers });
  }


  registerTransaction(machine_code, machine, txnRef, vpa, vpa_name, price, status) {
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });

    let body = {
      "machine": machine,
      "machine_code": machine_code,
      "txnRef": txnRef,
      "vpa": vpa,
      "vpa_name": vpa_name,
      "price": price,
      "status": status 
    }

    return this.http.post(this.base_url + "payments/register", { headers: headers });
  }


  
  getHistory(token, machine) {
    let body = {
      "machine_code": machine
    }

    let nativeCall = this.nativeHttp.post(
      this.base_url_native + "payments", // Url
      body, // body data
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + token
      } // header
    );

    return from(nativeCall).pipe();
  }


  getHistory_web(token, machine) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + token
    });
    let body = {
      "machine_code": machine
    }

    return this.http.post(this.base_url + "payments/", body, { headers: headers });
  }











  // Calling Roy's side api

  getMachineStatus(macid, reqid) {
    let body = {}
    let nativeCall = this.nativeHttp.get(
      this.machine_url + "status?macid=" + macid + "&reqid=" + reqid + "&key=" + this.machine_api_key, // Url
      body, // body data
      {} // header
    );
    return from(nativeCall).pipe();
  }

  getMachineStatusByMachineId(macid, reqid) {
    let body = {}
    let nativeCall = this.http.get(
      `${this.machine_url}status.php?macid=${macid}&reqid=${reqid}&key=${this.machine_api_key}`, // Url
      body, // body data
    );
    return nativeCall
  }


  vendProduct(macid, reqid) {
    let body = {}
    let nativeCall = this.http.get(
      `${this.machine_url}vends1.php?macid=${macid}&reqid=${reqid}&ky=${this.machine_api_key}`, // Url
      body, // body data
    );
    return nativeCall
  }


}
