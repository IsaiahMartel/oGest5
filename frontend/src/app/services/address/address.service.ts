import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from 'src/app/models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

    endpoint: string = "http://81.47.172.149:8300/api/mobile/getAddress";

  constructor(private httpClient: HttpClient,
  ) {


  }
  getAddresses() {
    return this.httpClient.get<Address[]>(this.endpoint);
  }

}