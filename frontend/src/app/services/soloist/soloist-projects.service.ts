import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { SoloistProjects } from 'src/app/models/soloist-projects';

import { Storage } from '@ionic/storage';

import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SoloistProjectsService {


  endpoint: string = "http://localhost:8000/api/soloist-projects";

  constructor(private httpClient: HttpClient, private storage: Storage, private localStorageService: LocalStorageService) {

  }

   getSoloistProjectsByProjectId(projectId) {
  
    return this.httpClient.get<SoloistProjects[]>(this.endpoint + "/projects/" + projectId).pipe(
      tap(_ => console.log("SoloistProject retrieved")),
      catchError(this.handleError<SoloistProjects[]>("Get soloist project", []))
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


