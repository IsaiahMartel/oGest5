import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';

import { AddressGroup } from 'src/app/models/address-group';
<<<<<<< HEAD
import { Address } from 'src/app/models/address';
=======
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  endpoint: string = "http://localhost:8000/api/mobile/getAddress";

  constructor(private httpClient: HttpClient,
  ) {

  }
  getAddresses() {
<<<<<<< HEAD
    return this.httpClient.get<Address[]>(this.endpoint);
=======
    return this.httpClient.get<AddressGroup[]>(this.endpoint);
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
  }

}