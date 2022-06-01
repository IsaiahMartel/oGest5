import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint:  string  =  'http://localhost:8000/api/auth';
  constructor(private httpClient : HttpClient) { }

  postUser(typeNotification) {

    let bodyEncoded = new URLSearchParams();
//     console.log(token);
    
//     console.log(token.endpoint.toString() + " token endpoint");
// console.log(token.expirationTime);
// console.log(token.keys.auth + " key auth");





    
// if(token.expirationTime!=null){
//   bodyEncoded.append("expirationTime", token.expirationTime.toString());
// }


//   bodyEncoded.append("auth", token.keys.auth.toString());


//     bodyEncoded.append("endpoint", token.endpoint.toString());
  
  
//     bodyEncoded.append("p256dh", token.keys.p256dh.toString());
  

    const body = bodyEncoded.toString();
    return this.httpClient.post<User>(this.endpoint, typeNotification);
  }

}


