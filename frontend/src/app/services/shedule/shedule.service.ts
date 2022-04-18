import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { Shedule } from 'src/app/models/shedule';

@Injectable({
  providedIn: 'root'
})
export class SheduleService {
  endpoint: string = "http://localhost:8000/api/mobile/getShedule";

  constructor(private httpClient: HttpClient,
  ) {

  }

  getSheduleByProjectId(projectId) {
    return this.httpClient.get<Shedule[]>(this.endpoint + "/projects/" + projectId).pipe(
      tap(_ => console.log("SheduleProject retrieved")),
      catchError(this.handleError<Shedule[]>("Get Shedule project", []))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}