import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { from, Observable, Subject, throwError } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { catchError, map } from 'rxjs/operators';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})


// El interceptor se usa para pasar el header de autenticación y captar errores cada vez que hay un http request
// (https://youtu.be/deK_HcoPRGw ver desde el 04 hasta el 05)
export class InterceptorService implements HttpInterceptor {

  private toast;
  isOnline: boolean;
  createdOnlyOneToast: boolean = true;
  errorSolved: boolean;
 

  backendStatusChange: Subject<boolean> = new Subject<boolean>();
  constructor(
    private storage: Storage,
    private toastController: ToastController
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
                if (this.errorSolved == false) {
                  this.errorSolved = true;
                  this.presentToastWithOptions("¡Solucionado!", "Conexión resuelta", "success", "checkmark-outline");
                }           
              }
   
              return event;
            }),
            catchError(this.manageError.bind(this))
          );
        })

      );
  }

  manageError(error: HttpErrorResponse) {
    let errorJSON = error.error
    let errorMessage = ""
    Object.values(errorJSON).forEach(element => errorMessage += element + "\n");

    // Muestro los errores en una alerta por la parte inferior
    if (errorMessage == "true\n") {
      this.presentToastWithOptions("¡Oops!", "Server caído", "danger", "information-circle");
      this.errorSolved = false;
    } else if (errorMessage == "Unauthenticated.\n") {

    } else if (errorMessage == "Unauthorized\n") {
      

    }

    else {
      this.presentToastWithOptions("¡Oops!", "Ha habido un problema, es posible que la aplicación no funcione correctamente", "danger", "information-circle");
    }

    return throwError("Error " + errorMessage + "\n" + errorJSON);
  }

  // Creación de los mensajes cuando backend caído o no hay conexión
  async presentToastWithOptions(header, message, color, icon) {

    // El mensaje se mantiene unos segundos cuando vuelve a haber conexión
    if (this.errorSolved == true) {
      this.toast.dismiss();
      this.createdOnlyOneToast =true;

    }

    // Elimina el mensaje anterior si lo hubiera
    if (this.createdOnlyOneToast == true) {
      this.toast = await this.toastController.create({
        header: header,
        message: message,
        color: color,
        icon: icon,
        position: 'bottom',
        cssClass: "my-custom-class",
        buttons: [{
          text: 'OK',
          role: 'cancel',
        }]
      });
      this.createdOnlyOneToast = false;
      await this.toast.present()
    }

   await this.toast.onDidDismiss().then(()=>{this.createdOnlyOneToast = true;
    });
    
 

    if (this.errorSolved == true) {
    setTimeout(() => {
      this.toast.dismiss();

    },
      8000);
    }

  }


}
