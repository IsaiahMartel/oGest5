import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  token = null;
httpOptions = null;

  constructor(private storage: Storage) {
    
  }

  async getToken() {
   this.token = await this.storage.get("access_token");

    return this.token;
  }



  setToken(token) {
    return this.token = token;
  }
}
