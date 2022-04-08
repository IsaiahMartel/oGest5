import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const headers = new HttpHeaders({
  "Accept": 'application/json',
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  url: string = "http://localhost:8000/api";

  constructor(private httpClient: HttpClient) { }

  sendBroadcastChat(message) {
    return this.httpClient.post(`${this.url}/chat`, JSON.stringify(message), { headers });
  }

  sendBroadcast() {
    console.log(this.httpClient.get(`${this.url}/broadcast`, { headers }));
    
    return this.httpClient.get(`${this.url}/broadcast`, { headers });
  }
}