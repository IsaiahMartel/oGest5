import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { from, Observable, Subject, throwError } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { catchError, map } from 'rxjs/operators';
import { ModalConnectionService } from '../services/modal-connection/modal-connection.service';
import { BackendStatusService } from '../services/backend-status/backend-status.service';
import { ToastController } from '@ionic/angular';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  public ModalconnectionService: ModalConnectionService;
  private dismissToast: boolean;
  private toast;
  isOnline: boolean;
  createdOnlyOneToast = 0;

  cf: boolean;

  backendStatusChange: Subject<boolean> = new Subject<boolean>();
  constructor(
    private storage: Storage, private modalConnectionService: ModalConnectionService,
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
                if (this.isOnline == false) {
                  this.dismissToast = true;
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

    if (errorMessage == "true\n") {
      this.presentToastWithOptions("¡Oops!", "Server caído", "danger", "information-circle");
      this.isOnline = false;
      this.dismissToast = false;
      this.createdOnlyOneToast++;
    } else if (errorMessage == "Unauthenticated.\n") {

    } 


    else {

      
      this.presentToastWithOptions("¡Oops!", "Ha habido un problema, es posible que la aplicación no funcione correctamente", "danger", "information-circle");
      this.dismissToast = false;
      this.createdOnlyOneToast++;
    }
    console.log(errorMessage);
    return throwError("Error " + errorMessage + "\n" + errorJSON);
  }

  // Creación de los mensajes cuando backend caído o no hay conexión
  async presentToastWithOptions(header, message, color, icon) {
    // Elimina el mensaje anterior si lo hubiera
    if (this.createdOnlyOneToast < 1) {
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
      await this.toast.present()
    }

    // El mensaje se mantiene unos segundos cuando vuelve a haber conexión
    if (this.dismissToast == true) {
      setTimeout(() => {
        this.toast.dismiss();
        this.toast
        this.isOnline = true;
        this.createdOnlyOneToast = 0;
      },
        8000);
    }
  }
}
