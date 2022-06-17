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
  // endpoint: string = "http://localhost:8000/api/mobile/";
  endpoint: string = 'https://ogest5.duckdns.org:8430/api/mobile/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  }
  constructor(private httpClient: HttpClient, private storage: Storage) { }

  postNotificationToken(tokenMobile, user) {

    var obj= {}
var tokenMobileParse = JSON.parse(JSON.stringify(tokenMobile));
obj['endpoint'] = tokenMobileParse.endpoint;
obj['keys'] =tokenMobileParse.keys;
obj['userEmail'] = user;



    return this.httpClient.post<PushNotification>(this.endpoint + "saveTokenNotification", JSON.stringify(obj), this.httpOptions);
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
