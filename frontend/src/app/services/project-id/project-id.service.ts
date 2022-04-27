import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class ProjectIdService {
 projectId :number;
 projectName: "";

  constructor(   public storage: Storage,) { }
changeProjectId(projectId){
  
  
  this.projectId=projectId;
  this.storage.get("projects").then(data => {
    if (data) {
      var array = JSON.parse(data);

      array.filter((project) => {


        if (project.id == this.projectId) {



          this.projectName = project.events.eventName;






        };
      })
    }

  })
}


 
  
}
