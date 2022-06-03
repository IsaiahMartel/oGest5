import { AfterViewInit, Component } from '@angular/core';

// Servicio para ir a por datos al backend y guardar los datos en el caché
import { CheckDataService } from './services/check-data/check-data.service';
// Alertas para notificar al usuario (visualmente)
import { AlertController, ToastController } from '@ionic/angular';

// Servicio para comprobar si hay conexión
import { ModalConnectionService } from './services/modal-connection/modal-connection.service';

// Para las notificaciones push y actualizaciones
import { PushNotificationService } from './services/push-notification/push-notification.service';
import { SwPush, SwUpdate } from '@angular/service-worker';
// Indexdb que lo usamos para guardar en caché las notificaciones
import Localbase from 'localbase';
let db = new Localbase('db');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements AfterViewInit {
  isOnline: boolean;
  private notificationNotGranted;

  // Key para las notificaciones
  public readonly vapidNotificationPublicKey = "BA15WyNaTv36X9A86QEjVWjiq5xfiC6nrpIxedhLV9lt4c0WZrko06ir6hJpFej6aazbCVzwgTWVVqoZWVLO5ps";

  // Alertas que salen en la parte inferior de la pantalla
  private fadeToast: boolean;
  private toast;

  constructor(
    private modalConnectionService: ModalConnectionService,
    private alertController: AlertController,
    private toastController: ToastController,
    private checkDataService: CheckDataService,
    private swPush: SwPush,
    private swUpdate: SwUpdate,
    private pushNotificationService: PushNotificationService,
  ) {


  }

  ngOnInit() {
    this.clientOfflineAlert();
    this.subscribeToNotifications();


    // Comprueban que lleguen las notificaciones cuando se está dentro de la aplicación
    this.swPush.messages.subscribe(() => {
      this.checkForNewData();
    })


    // Comprueba si hay nuevas notificaciones
    this.checkForNewData();
    // Comprueba si hay actualizaciones
    this.updateApp();

    // Para poner el theme del calendario
    this.checkDataService.setTheme();
  }

  ngAfterViewInit(): void {

  }



  clientOfflineAlert() {
    this.modalConnectionService.appIsOnline$.subscribe(online => {
      if (!online) {
        this.presentToastWithOptions("¡Atención!", "No tienes conexión", "warning", "warning-outline");
        this.isOnline = false;
        this.fadeToast = false;
      } else {
        if (this.isOnline == false) {
          this.fadeToast = true;
          this.presentToastWithOptions("¡Hurra!", "Vuelves a tener conexion", "success", "checkmark-outline");
        }
      }
    })
  }

  subscribeToNotifications(): any {
    // Comprobación de si las notificaciones están activadas
    this.swPush.subscription.subscribe(subscription => {
      if (subscription == null) {
        this.alert("¡Atención!", "Debes aceptar las notificaciones para usar esta app", 'Haz click en "Permitir" en la ventana de notficaciones', [
          {
            text: 'Android',

            cssClass: 'secondary',
            id: 'android-button',
            handler: () => {
              console.log('Manual de android');
            }
          }, {
            text: 'PC',
            cssClass: 'secondary',
            id: 'pc-button',
            handler: () => {
              console.log('Manual de ordenador');
            }
          }]);

      } else {
        if (this.notificationNotGranted != null) {
          this.notificationNotGranted.dismiss();
          this.fadeToast = true;
          this.presentToastWithOptions("¡Hurra!", "Ya tienes las notificaciones activadas, disfruta de la app", "success", "checkmark-outline");
        }

      
      }
    }
    
    );

      // Guardamos la subscripción de la notificación en la base de datos
      this.swPush.requestSubscription({
        serverPublicKey: this.vapidNotificationPublicKey
      }).then(sub => {
        this.pushNotificationService.postNotificationToken(JSON.stringify(sub)).subscribe();
        ;
      })
  }

  checkForNewData() {
    db.collection('notifications').get().then(tasks => {
      var haveToUpdate = false;
      var projects = "";
      for (let task of tasks) {
        if (task.showed == false) {
          haveToUpdate = true;
          projects = projects + " " + task.body

          db.collection('notifications').doc({ date: task.date }).update({
            showed: true
          })
        }
      }
      if (haveToUpdate == true) {
        this.alert("Se han realizado cambios", "", projects, ["OK"]);
        this.checkDataService.getProjects();
        this.checkDataService.getShedule();
        this.checkDataService.getAddress();
        this.checkDataService.getPlaylist();
      }
    })
  }


  updateApp() {
    //Por algun motivo se ejecuta dos veces cuando hay una actualizacion, quizas porque recargo la pagina
    var fixUpdateTwice = 0;
    this.swUpdate.versionUpdates.subscribe(() => {
      fixUpdateTwice++;

      if (fixUpdateTwice > 1) {
        this.alert("Nueva versión disponible", "", "Se requiere una actualización", ['OK']);
      }
    }
    )
  }

  async alert(header: string, subHeader: string, message: string, buttons) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons
    });

    await alert.present();
  }

  async presentToastWithOptions(header, message, color, icon) {
    // Elimina el mensaje anterior si lo hubiera
    try {
      this.toast.dismiss();
    } catch (e) { }

    this.toast = await this.toastController.create({
      header: header,
      message: message,
      color: color,
      icon: icon,
      position: 'bottom',
    });
    await this.toast.present()

    // El mensaje se mantiene unos segundos cuando vuelve a haber conexión
    if (this.fadeToast == true) {
      setTimeout(() => {
        this.toast.dismiss();
        this.isOnline = true;
      },
        8000);
    }
  }


  // async permissionNotificationNotGrantedAlert(header: string, message: string) {

  //   this.notificationNotGranted = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: header,
  //     subHeader: "Debes aceptar las notificaciones para usar esta app",
  //     message: message,
  //     backdropDismiss: false,
  //     buttons: [
  //       {
  //         text: 'Android',

  //         cssClass: 'secondary',
  //         id: 'android-button',
  //         handler: () => {
  //           console.log('Manual de android');
  //         }
  //       }, {
  //         text: 'PC',
  //         cssClass: 'secondary',
  //         id: 'pc-button',
  //         handler: () => {
  //           console.log('Manual de ordenador');
  //         }
  //       }]
  //   });

  //   await this.notificationNotGranted.present();
  // }



  // showConfirm() {
  //   this.alertController.create({
  //     header: 'Nueva versión disponible',

  //     message: 'Se requiere una actualización',
  //     buttons: [
  //       {
  //         text: 'OK',
  //         handler: () => {
  //           this.swUpdate.activateUpdate().then(() => { window.location.reload() });
  //         }
  //       },
  //     ]
  //   }).then(res => {
  //     res.present();
  //   });
  // }

  // Creación de los mensajes inferiores cuando backend caído o no hay conexión
  


  // Lo puedo utilizar cuando se hagha un suscribe y no haya conexion, para esperar a que la haya
  // backgroundSync(){
  //   navigator.serviceWorker.ready.then((swRegistration)=> swRegistration.sync.register('post-data'))
  // }
}














