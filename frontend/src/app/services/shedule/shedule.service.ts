import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { Shedule } from 'src/app/models/shedule';

@Injectable({
  providedIn: 'root'
})
export class SheduleService {
  endpoint: string = "http://81.47.172.149:8300/api/mobile/getShedule";

  constructor(private httpClient: HttpClient,
  ) {

  }
  getShedules() {
    return this.httpClient.get<Shedule[]>(this.endpoint);
  }

}