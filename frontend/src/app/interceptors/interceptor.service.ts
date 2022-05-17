import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { from, Observable, Subject, throwError } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { catchError, map } from 'rxjs/operators';
import { ModalConnectionService } from '../services/modal-connection/modal-connection.service';
import { BackendStatusService } from '../services/backend-status/backend-status.service';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  public ModalconnectionService: ModalConnectionService;
cf : boolean;

    backendStatusChange: Subject<boolean> = new Subject<boolean>();
  constructor(
    private storage: Storage,   private modalConnectionService: ModalConnectionService,
    private backendStatusService:BackendStatusService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const auth = this.injector.get(ModalConnectionService);
    // console.log(auth);
    // this.modalConnectionService.getInterceptedSource().next(true);
  //   console.log( this.modalConnectionService.string)
  //   // console.log( this.modalConnectionService.string);
    
  //  console.log(this.backendStatusService);
  //  console.log(this.storage);
//     const auth = this.injector.get(ModalConnectionService);
// console.log(auth);



    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.storage.ready().then(() => this.storage.get('access_token'))}`
    });


    return from(this.storage.get(TOKEN_KEY))
      .pipe(
        switchMap(token => {
          if (token) {
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
         
            
          }

          if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
          }


          return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {

              }
              return event;
            }),
           
            catchError(this.manageError.bind(this))
          );
        })

      );
  }

 
  // lol(){
  //   console.log(this.backendStatusService);
    
  // }

  manageError(error: HttpErrorResponse) {


    let errorJSON = error.error
    let errorMessage = ""
    Object.values(errorJSON).forEach(element => errorMessage += element + "\n");
    // console.log(errorMessage, errorJSON);


  
    if(errorMessage=="true\n"){

    this.modalConnectionService.getInterceptedSource().next(true);

    
      // this.modalConnectionService.backendDownObs.subscribe(value => this.m = value) 
     
      // this.backendStatusService.changeStatus(true);

      // this.modalConnectionService.backendDownObs.next(true)
//       this.modalConnectionService.backendDown=true;
// this.modalConnectionService.backendDownObs.next(this.modalConnectionService.backendDown);
 


    }else{
      this.modalConnectionService.getInterceptedSource().next(false);
    }

    



    return throwError("Error " + errorMessage + "\n" + errorJSON);
  }


}
