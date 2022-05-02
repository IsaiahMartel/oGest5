import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username:string;
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8000/api/auth';
  authSubject  =  new  BehaviorSubject(false);

  constructor(private  httpClient:  HttpClient) { }

  login(user: User): Observable<any> {
    this.username=user.email;
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user)
  }
}
