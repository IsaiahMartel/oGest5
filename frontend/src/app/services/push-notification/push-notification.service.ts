import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PushNotification } from 'src/app/models/push-notification';
import { User } from 'src/app/models/user';
  
@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  //Mover a mobile una vez termine pruebas
  endpoint: string = "http://localhost:8000/api/notification";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
     
    })
  }
  constructor( private httpClient: HttpClient,) { }


  postNotificationToken(tokenMobile) {

    let bodyEncoded = new URLSearchParams();

  

    const body = bodyEncoded.toString();
    return this.httpClient.post<PushNotification>(this.endpoint, tokenMobile, this.httpOptions);
  }



}
