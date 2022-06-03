import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth/auth.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint: string = 'http://localhost:8000/api/notificationUser';
  constructor(private httpClient: HttpClient,
    private authService: AuthService, private storage: Storage) { }

  putUser(notification) {

    let bodyEncoded = new URLSearchParams();
    //     console.log(token);

    //     console.log(token.endpoint.toString() + " token endpoint");
    // console.log(token.expirationTime);
    // console.log(token.keys.auth + " key auth");






    // if(token.expirationTime!=null){
    //   bodyEncoded.append("expirationTime", token.expirationTime.toString());
    // }


    //   bodyEncoded.append("auth", token.keys.auth.toString());

    this.storage.get("user_id").then(data => {



      let body = new URLSearchParams();
      body.set('notification', notification);

      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };


      return this.httpClient.put<User>(this.endpoint + "/" + data, body.toString(), options).subscribe(response => {
      console.log(response);
      
      });
    })

  }

}

