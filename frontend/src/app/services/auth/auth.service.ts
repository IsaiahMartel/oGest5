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
  // endpoint: string = "http://localhost:8000/api/auth";
  endpoint:  string  =  'https://ogest5.duckdns.org:8430/api/auth';
  authSubject  =  new  BehaviorSubject(false);

  constructor(private  httpClient:  HttpClient, private storage: Storage) { }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.endpoint}/login`, user).pipe(
      tap(async (res: AuthResponse) => {
     

        this.storage.set("user_id", JSON.stringify(res.user_id));

        if (res.access_token) {
      
          this.storage.ready().then(() => {
            this.storage.set("access_token", res.access_token);
          })
        }
      }));
  }
}
