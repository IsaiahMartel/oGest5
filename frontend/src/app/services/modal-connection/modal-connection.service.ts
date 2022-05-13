import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge, of, interval, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProjectsService } from '../projects/projects.service';

@Injectable({
  providedIn: 'root'
})
export class ModalConnectionService {

  public appIsOnline$: Observable<boolean>;
backendDown =false;
backendDownObs: Subject<boolean> = new Subject<boolean>();
  endpoint: string = "http://localhost:8000/api/mobile/checkBackendStatus";

  constructor(private httpClient: HttpClient, private projectsService: ProjectsService,) { 
    this.initConnectivityMonitoring();
    this.backendStatus();

  }

  private initConnectivityMonitoring() {

    if (!window || !navigator || !('onLine' in navigator)) return;

    this.appIsOnline$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(map(() => navigator.onLine))

  }

  backendStatus(){
    var that=this;
    // return this.httpClient.get(this.endpoint);
  setInterval(function(){
    console.log(that.backendDown);
    
    that.httpClient.get(that.endpoint).subscribe();
  }, 1000)
  
  }



}

