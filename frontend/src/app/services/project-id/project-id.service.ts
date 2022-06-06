import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


// Este servicio se usa dentro de los tabs para saber el id
export class ProjectIdService {
  projectId: number;
  projectName: "";
  private requestInterceptedSource: Subject<number> = new Subject<number>();
  requestIntercepted: Observable<number> = this.requestInterceptedSource.asObservable();

  constructor(public storage: Storage,) { this.changeProjectId()}


  changeProjectId() {
    this.requestIntercepted.subscribe((projectId) => {
      this.projectId = projectId
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
    });
  }

  public getInterceptedSource(): Subject<number> {
    return this.requestInterceptedSource;
  }

}
