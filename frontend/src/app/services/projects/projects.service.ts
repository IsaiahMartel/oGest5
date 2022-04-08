import { Injectable } from '@angular/core';

import { HttpClient, } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Projects } from '../../models/projects'
import { Storage } from '@ionic/storage';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class ProjectsService {

  endpoint: string = "http://localhost:8000/api/projects";

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private localStorageService: LocalStorageService
  ) {

  }

  getProjects() {

    return this.httpClient.get<Projects[]>(this.endpoint);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}


