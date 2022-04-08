import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DirectorProjects } from 'src/app/models/director-projects';
import { Storage } from '@ionic/storage';

import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})


export class DirectorProjectsService {


  endpoint: string = "http://localhost:8000/api/director-projects";

  constructor(private httpClient: HttpClient, private storage: Storage, private localStorageService: LocalStorageService) {

  }

   getDirectorProjectsByProjectId(projectId) {
    return this.httpClient.get<DirectorProjects[]>(this.endpoint + "/projects/" + projectId)
  }
}


