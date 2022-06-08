import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, Subject } from 'rxjs';

import Localbase from 'localbase';
let db = new Localbase('db');

@Injectable({
  providedIn: 'root'
})


// Este servicio se usa dentro de los tabs para saber el id
export class ProjectIdService {
  projectId: number;
  projectName: "";
  private requestInterceptedSource: Subject<number> = new Subject<number>();
  requestIntercepted: Observable<number> = this.requestInterceptedSource.asObservable();


  constructor(public storage: Storage,) { this.changeProjectId() }


  changeProjectId() {

    this.requestIntercepted.subscribe((projectId) => {
      this.projectId=projectId;

      db.collection('projects').get().then(data => {
        if (data) {
          // var array = JSON.parse(data);


          data.filter((project) => {
            if (project.id == this.projectId) {
              this.projectName = project.events.eventName;
       

            };
          })
        }
      })
    });
  }

  public getInterceptedSource(): Subject<number> {
    return this.requestInterceptedSource;
  }

}
