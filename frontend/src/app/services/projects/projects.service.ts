import { Injectable } from '@angular/core';

import { HttpClient, } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Project } from 'src/app/models/project';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})

export class ProjectsService {

  endpoint: string = "http://localhost:8000/api/mobile/getProjects";

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,

  ) {

  }

  getProjects() {
    return this.httpClient.get<Project[]>(this.endpoint);
  }

}


