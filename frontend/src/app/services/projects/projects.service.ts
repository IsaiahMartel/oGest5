import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Project } from 'src/app/models/project';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})

export class ProjectsService {

  endpoint: string = "http://81.47.172.149:8300/api/mobile/getProjects";

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,

  ) {

  }

  getProjects() {
    return this.httpClient.get<Project[]>(this.endpoint);
  }

}


