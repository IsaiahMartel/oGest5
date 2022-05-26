import { AfterViewInit, Component } from '@angular/core';
import { Echo } from 'laravel-echo-ionic';
import { ModalConnectionService } from './services/modal-connection/modal-connection.service';
import { AlertController } from '@ionic/angular';
import { ProjectsService } from './services/projects/projects.service';
import { PlaylistsService } from './services/playlists/playlists.service';
import { SheduleService } from './services/shedule/shedule.service';
import { AddressService } from './services/address/address.service';
import { Shedule } from './models/shedule';
import { Project } from './models/project';
import { Playlist } from 'src/app/models/playlist';
import { AddressGroup } from 'src/app/models/address-group';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { CheckDataService } from './services/check-data/check-data.service';
import { SwPush, SwUpdate } from '@angular/service-worker';

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
  public readonly VAPID_PUBLIC_KEY = "BHxdNGlVv0_7xxnqU8ybPb5OS_X-9cc2l5nnOaZSMXjrjUQFDNNQsP6mriwv8_m82_ypRvC9O8jfiDdq8nO1oeY";

  private dismissToast: boolean;
  private toast;
  private fixUpdateTwice = 0;
  constructor(
    private modalConnectionService: ModalConnectionService,
    private alertController: AlertController,
    private projectsService: ProjectsService,
    private sheduleService: SheduleService,
    private playlistService: PlaylistsService,
    private addressServivce: AddressService,
    private storage: Storage,
    private toastController: ToastController,
    private checkDataService: CheckDataService,
    private swPush: SwPush,
    private swUpdate: SwUpdate

  ) {
    this.subscribeToNotifications();
 
  }


  ngAfterViewInit(): void {
    // this.updateData();
    this.clientOfflineAlert();
    // this.doConnectionWebSocket();
    this.checkDataService.setTheme();

    this.updateApp();

  }

  subscribeToNotifications(): any {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(sub => {
      const token = JSON.stringify(sub);

      //Se debe guardar este token en la base de datos
      console.log(token + sub);

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

  doConnectionWebSocket() {
    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'local',
      wsHost: 'localhost',
      wsPort: 6001,
      forceTLS: false,
      disableStats: true
    });

    // Muestra una alerta y actualiza los datos
    const channel = echo.channel('channel');
    channel.listen('Hello', (data) => {


      this.notification(data);
    });


  }

  async notification(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Se han realizado cambios',
      message: message,
      buttons: ['OK']
    });


    await alert.present();
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

  showConfirm(version) {
    this.alertController.create({
      header: 'Nueva versión disponible',
      subHeader: 'version ' + version,
      message: '¿Quieres actualizar?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.swUpdate.activateUpdate().then(() => { window.location.reload() });
          }
        },
        {
          text: 'No',

        },


      ]
    }).then(res => {
      res.present();
    });
  }

  updateApp() {
    //Por algun motivo se ejecuta dos veces cuando hay una actualizacion, quizas porque recargo la pagina
    this.swUpdate.versionUpdates.subscribe((event) => {
      this.fixUpdateTwice++;
  
      if (this.fixUpdateTwice > 1) {
        this.showConfirm("x.x");
      }}
      )
  }
}














