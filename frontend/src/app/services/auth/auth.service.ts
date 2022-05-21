import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { AuthResponse } from 'src/app/models/auth-response';
import { User } from 'src/app/models/user';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username:string;
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8000/api/auth';
  authSubject  =  new  BehaviorSubject(false);

  constructor(private  httpClient:  HttpClient, private storage: Storage) { }

  login(user: User): Observable<AuthResponse> {

    this.username=user.mobileEmail;
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res: AuthResponse) => {

        if (res.access_token) {
      
       
          this.storage.ready().then(() => {
            this.storage.set("access_token", res.access_token);
          })
        }
      }));
  }
}
