import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



const apiUrl = 'http://localhost/learn2earn/public/';

//const apiUrl = 'https://learn2earnn.com/l2e/public/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

  con(data: any , type: any ) {
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + type, JSON.stringify(data)).
      subscribe(res => {
        resolve(JSON.stringify(res));
      }, (err) => {
        reject(err);
        console.log(err);
      });
    });
  }


  // geting posts

  getdata(type: any) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + type).
      subscribe(res => {
        resolve(JSON.stringify(res));
      },  (err) => {
        reject(err);
        console.log(err);
      });
    });
  }

}
