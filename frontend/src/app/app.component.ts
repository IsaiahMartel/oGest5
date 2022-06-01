import { AfterViewInit, Component } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import Localbase from 'localbase';
import { Subscription } from 'rxjs';
import { AddressService } from './services/address/address.service';
import { CheckDataService } from './services/check-data/check-data.service';
import { IndexedDBService } from './services/indexed-db/indexed-db.service';
import { ModalConnectionService } from './services/modal-connection/modal-connection.service';
import { PlaylistsService } from './services/playlists/playlists.service';
import { ProjectsService } from './services/projects/projects.service';
import { PushNotificationService } from './services/push-notification/push-notification.service';
import { SheduleService } from './services/shedule/shedule.service';

let db = new Localbase('db');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements AfterViewInit {
  isOnlineText: string;
  isOnline: boolean;
  htmlToAdd;
  divConnectionAlert;

  public readonly publicKey = "BA15WyNaTv36X9A86QEjVWjiq5xfiC6nrpIxedhLV9lt4c0WZrko06ir6hJpFej6aazbCVzwgTWVVqoZWVLO5ps";

  private dismissToast: boolean;
  private toast;
  private notificationNotGranted;

  constructor(
    private modalConnectionService: ModalConnectionService,
    private alertController: AlertController,
    private toastController: ToastController,
    private checkDataService: CheckDataService,
    private swPush: SwPush,
    private swUpdate: SwUpdate,
    private pushNotificationService: PushNotificationService,


  ) {
    this.subscribeToNotifications();

  }

  ngOnInit() {
    this.checkForNewData();
    this.swPush.messages.subscribe(() => {

      this.checkForNewData();

    })

    this.updateApp();
  }



  ngAfterViewInit(): void {
    this.clientOfflineAlert();
    this.checkDataService.setTheme();

  }

  subscribeToNotifications(): any {
    this.swPush.subscription.subscribe(subscription => {
      if (subscription == null) {
        this.notification("¡Atención!", 'Si ves un botón que pone "¿Deseas permitir notificaciones? Si no, tendrás que activarlo en la configuración de la aplicación"');
        // this.dismissToast = false;
        // this.presentToastWithOptions("¡Atención!", "No puedes usar la app porque no has activado las notificaciones", "warning", "warning-outline");

        // this.isOnline = false;
      } else {
        if (this.notificationNotGranted != null) {
          this.notificationNotGranted.dismiss();
          this.dismissToast = true;
          this.presentToastWithOptions("¡Hurra!", "Ya tienes las notificaciones activadas, disfruta de la app", "success", "checkmark-outline");


        }




      }
    }
    );


    this.swPush.requestSubscription({
      serverPublicKey: this.publicKey
    }).then(sub => {
      console.log(JSON.stringify(sub));
      this.pushNotificationService.postNotificationToken(JSON.stringify(sub)).subscribe();
      ;
    })






  }

  clientOfflineAlert() {
    this.modalConnectionService.appIsOnline$.subscribe(online => {
      if (!online) {
        this.presentToastWithOptions("¡Atención!", "No tienes conexión", "warning", "warning-outline");
        this.isOnline = false;
        this.dismissToast = false;
      } else {
        if (this.isOnline == false) {
          this.dismissToast = true;
          this.presentToastWithOptions("¡Hurra!", "Vuelves a tener conexion", "success", "checkmark-outline");
        }
      }
    })
  }

  async notification(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  async permissionNotificationNotGrantedAlert(header: string, message: string) {
    this.notificationNotGranted = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: "Debes aceptar las notificaciones para usar esta app",
      message: message,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Android',

          cssClass: 'secondary',
          id: 'android-button',
          handler: (blah) => {
            console.log('Manual de android');
          }
        }, {
          text: 'iOS',
          cssClass: 'secondary',
          id: 'ios-button',
          handler: () => {
            console.log('Manual de ios');
          }
        }]
    });

    await this.notificationNotGranted.present();
  }

  // Creación de los mensajes cuando backend caído o no hay conexión
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
    if (this.dismissToast == true) {
      setTimeout(() => {
        this.toast.dismiss();
        this.isOnline = true;
      },
        8000);
    }
  }

  showConfirm() {
    this.alertController.create({
      header: 'Nueva versión disponible',

      message: 'Se requiere una actualización',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.swUpdate.activateUpdate().then(() => { window.location.reload() });
          }
        },
      ]
    }).then(res => {
      res.present();
    });
  }

  updateApp() {
    //Por algun motivo se ejecuta dos veces cuando hay una actualizacion, quizas porque recargo la pagina
    var fixUpdateTwice = 0;
    this.swUpdate.versionUpdates.subscribe((event) => {
      fixUpdateTwice++;

      if (fixUpdateTwice > 1) {
        this.showConfirm();
      }
    }
    )
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
        this.notification("Se han realizado cambios", projects);
        this.checkDataService.getProjects();
        this.checkDataService.getShedule();
        this.checkDataService.getAddress();
        this.checkDataService.getPlaylist();
      }
    })
  }


  // Lo puedo utilizar cuando se hagha un suscribe y no haya conexion, para esperar a que la haya
  // backgroundSync(){
  //   navigator.serviceWorker.ready.then((swRegistration)=> swRegistration.sync.register('post-data'))
  // }
}














