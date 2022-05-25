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

  private dismissToast: boolean;
  private toast;

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

  ) { }


  ngAfterViewInit(): void {
// this.updateData();
    this.clientOfflineAlert();
    this.doConnectionWebSocket();
    this.checkDataService.setTheme();

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


}









