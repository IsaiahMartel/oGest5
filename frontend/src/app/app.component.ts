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
import { PushNotificationService } from './services/push-notification/push-notification.service';
import { interval, startWith, Subscription, switchMap } from 'rxjs';
import { IndexedDBService } from './services/indexed-db/indexed-db.service';
declare var EventSourcePolyfill: any;
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
  private fixUpdateTwice = 0;

  timeInterval: Subscription;
  title = 'Polling in angular';
  status: any;

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
    private swUpdate: SwUpdate,
    private pushNotificationService: PushNotificationService,
    private indexDBService : IndexedDBService

  ) {
    this.subscribeToNotifications();

  }



  ngOnInit() {
// this.indexDBService.addUser(obj.name).then(this.backgroundSync).catch(console.log);
// )

//     let stream = new EventSource('http://localhost:8000/api/stream');
// console.log(stream);


//     stream.addEventListener('ping', event =>{
//     console.log(event)
  
//         // JSON.parse(event.data).forEach(message => {
         
//         // }))
//   })

  //   stream.addEventListener('message', message => {
  //    console.log(message);
  //    console.log("hola");
     
     
  // });
    // let stream = new EventSource('http://localhost:8000/api/stream', { withCredentials: true });


    // stream.addEventListener('ping', event =>
    
    //   JSON.parse(event.data).forEach(message =>{
    //     console.log(message);
    //   }))
  

 

}

ngAfterViewInit(): void {
  this.clientOfflineAlert();
  // this.doConnectionWebSocket();
  this.checkDataService.setTheme();
  this.updateApp();
  this.swPush.messages.subscribe(message => console.log(message));



}

subscribeToNotifications(): any {
  this.swPush.requestSubscription({
    serverPublicKey: this.publicKey
  }).then(sub => {
    console.log(JSON.stringify(sub));
    this.pushNotificationService.postNotificationToken(JSON.stringify(sub)).subscribe();
    ;
  })

  // {
  //   const token =  JSON.parse(JSON.stringify(sub) );
  //   //Se debe guardar este token en la base de datos
  //   this.pushNotificationService.postNotificationToken(token);
  //   console.log(token + sub);

  // })
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
    this.getData();
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
    }
  }
  )
}

getData(){
  // Usar para actualizar, ver si es capaz de ir por los datos concretos
}

  // postSync(){

  // }

  // backgroundSync(){
  //   navigator.serviceWorker.ready.then((swRegistration)=> swRegistration.sync.register('post-data'))
  // }
}














