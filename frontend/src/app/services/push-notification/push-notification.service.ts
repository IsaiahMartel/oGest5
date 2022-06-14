import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { PushNotification } from 'src/app/models/push-notification';
import { User } from 'src/app/models/user';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  //Mover a mobile una vez termine pruebas
  // endpoint: string = "http://localhost:8000/api/";
  endpoint: string = 'https://ogest5.duckdns.org:8430/api/mobile/';
  // endpoint: string = 'https://ogest5.duckdns.org:8430/api/notificationUser';

  // endpoint: string = "https://ogest5.duckdns.org:8430/api/notification";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  }
  constructor(private httpClient: HttpClient, private storage: Storage) { }


  postNotificationToken(tokenMobile) {
    console.log(this.endpoint + "notification");

    return this.httpClient.post<PushNotification>(this.endpoint + "saveTokenNotification", tokenMobile, this.httpOptions);
  }


  async silenceNotification(notification) {

    return from (this.storage.get("user_id").then(data => {
      let body = new URLSearchParams();
      body.set('notification', notification);

      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };


      return this.httpClient.put<User>(this.endpoint + "notificationMode/" + data, body.toString(), options);
    }))

  }

  async getNotificationStatus() {
    return from(this.storage.get("user_id").then(userId => {


      return this.httpClient.get(this.endpoint + "notificationMode/" + userId)


  }))

}
}
