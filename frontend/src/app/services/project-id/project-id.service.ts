import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, Subject } from 'rxjs';

import Localbase from 'localbase';
let db = new Localbase('db');
db.config.debug = false

@Injectable({
  providedIn: 'root'
})


// Este servicio se usa dentro de los tabs para saber el id
export class ProjectIdService {
  projectId: number;
  projectName: "";
  private requestInterceptedSource: Subject<number> = new Subject<number>();
  requestIntercepted: Observable<number> = this.requestInterceptedSource.asObservable();
  private requestedProjectNameInterceptedSource: Subject<string> = new Subject<string>();
  requestedProjectNameIntercepted: Observable<string> = this.requestedProjectNameInterceptedSource.asObservable();

  constructor(public storage: Storage,) {  }

  public getInterceptedSource(): Subject<number> {
    return this.requestInterceptedSource;
  }

  public getRequestedProjectNameInterceptedSource(): Subject<string> {
    return this.requestedProjectNameInterceptedSource;
  }


}
