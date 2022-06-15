import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';
// Alertas para notificar al usuario (visualmente)
import { AlertController, ModalController, ToastController } from '@ionic/angular';
// Indexdb que lo usamos para guardar en caché las notificaciones
import Localbase from 'localbase';
// Servicio para ir a por datos al backend y guardar los datos en el caché
import { CheckDataService } from './services/check-data/check-data.service';
// Servicio para comprobar si hay conexión
import { CheckOnlineStatus } from './services/checkOnlineStatus/check-online-status.service';
// Para las notificaciones push y actualizaciones
import { PushNotificationService } from './services/push-notification/push-notification.service';



let db = new Localbase('db');



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements AfterViewInit {
  isOnline: boolean;
  private ionAlert;

  // Key para las notificaciones
  public readonly vapidNotificationPublicKey = "BA15WyNaTv36X9A86QEjVWjiq5xfiC6nrpIxedhLV9lt4c0WZrko06ir6hJpFej6aazbCVzwgTWVVqoZWVLO5ps";

  // Alertas que salen en la parte inferior de la pantalla
  private fadeToast: boolean;
  private toast;

  constructor(
    private CheckOnlineStatus: CheckOnlineStatus,
    private alertController: AlertController,
    private toastController: ToastController,
    private checkDataService: CheckDataService,
    private swPush: SwPush,
    private swUpdate: SwUpdate,
    private pushNotificationService: PushNotificationService,
    private modalController: ModalController,
    private router: Router,
  ) {


  }

  ngOnInit() {
    this.clientOfflineAlert();
    // this.subscribeToNotifications();


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
    this.CheckOnlineStatus.appIsOnline$.subscribe(online => {
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



  checkForNewData() {
    db.collection('notifications').get().then(tasks => {
      var haveToUpdate = false;
      var projects = "";
      for (let task of tasks) {
        if (task.shown == false) {
          haveToUpdate = true;
          projects = projects + " " + task.body

          db.collection('notifications').doc({ date: task.date }).update({
            shown: true
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
        this.alert("Nueva versión disponible", "", "Se requiere una actualización", [{text: 'OK',  handler: () => {
          location.reload();
        }}],);
      }
    }
    )
  }

  async alert(header: string, subHeader: string, message: string, buttons,) {
  
      this.ionAlert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: buttons,
       backdropDismiss: false
      });
    


    await this.ionAlert.present();

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


  async presentModal(component) {
    const modal = await this.modalController.create({
      component: component,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }



  

}














