import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';

import { AddressGroup } from 'src/app/models/address-group';
import { Address } from 'src/app/models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  endpoint: string = "http://localhost:8000/api/mobile/getAddress";

  constructor(private httpClient: HttpClient,
  ) {

  }
  getAddresses() {
    return this.httpClient.get<Address[]>(this.endpoint);
  }

}