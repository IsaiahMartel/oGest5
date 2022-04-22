import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProjectIdService {
 projectId :number;

  constructor() { }
changeProjectId(projectId){
  this.projectId=projectId;
}
 
  
}
