import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from 'src/app/models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

    endpoint: string = "https://ogest5.duckdns.org:8430/api/mobile/getAddress";
    // endpoint: string = "http://localhost:8000/api/mobile/getAddress";
  constructor(private httpClient: HttpClient,
  ) {


  }
  getAddresses() {
    return this.httpClient.get<Address[]>(this.endpoint);
  }

}