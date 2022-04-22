import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';

import { AddressGroup } from 'src/app/models/address-group';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  endpoint: string = "http://localhost:8000/api/mobile/getAddress";

  constructor(private httpClient: HttpClient,
  ) {

  }
  getAddresses() {
    return this.httpClient.get<AddressGroup[]>(this.endpoint);
  }
  // getAdressByProjectId(projectId) {
  //   return this.httpClient.get<Address[]>(this.endpoint + "/" + projectId).pipe(
  //     tap(_ => console.log("AdressProject retrieved")),
  //     catchError(this.handleError<Address[]>("Get Address project", []))
  //   );
  // }
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     console.log(`${operation} failed: ${error.message}`);
  //     return of(result as T);
  //   };
  // }
}