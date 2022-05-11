import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { catchError, map } from 'rxjs/operators';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {


  constructor(
    private alertController: AlertController,
    private storage: Storage,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {




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
            catchError(this.manageError)
          );
        })

      );
  }


  manageError(error: HttpErrorResponse) {


    let errorJSON = error.error
    let errorMessage = ""
    Object.values(errorJSON).forEach(element => errorMessage += element + "\n");
    console.log(errorMessage, errorJSON);



    return throwError("Error " + errorMessage + "\n" + errorJSON);
  }

}
