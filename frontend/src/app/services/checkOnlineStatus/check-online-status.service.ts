import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrowserOpenOptions } from '@capacitor/browser';
import { Observable, fromEvent, merge, of, interval, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectsService } from '../projects/projects.service';

@Injectable({
  providedIn: 'root'
})
export class CheckOnlineStatus {
  public appIsOnline$: Observable<boolean>;
  private requestInterceptedSource: Subject<boolean> = new Subject<boolean>();
  requestIntercepted: Observable<boolean> = this.requestInterceptedSource.asObservable();
// backendDownObs: Subject<boolean> = new Subject<boolean>();
  // endpoint: string = "http://localhost:8000/api/checkBackendStatus";
    endpoint: string = "https://ogest5.duckdns.org:8430/api/checkBackendStatus";

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
    this.httpClient.get(this.endpoint).subscribe()
    var that=this;
    // return this.httpClient.get(this.endpoint);
  setInterval(function(){

    that.httpClient.get(that.endpoint).subscribe();
  }, 10000)
  
  }

  public getInterceptedSource(): Subject<boolean> {
    return this.requestInterceptedSource;
}


}

