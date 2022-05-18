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
import { Address } from 'src/app/models/address';
import { AddressGroup } from 'src/app/models/address-group';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

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

  public sheduleArray: Shedule[] = [];
  public projectsArray: Project[] = [];
  public playlistArray: Array<Playlist> = [];
  public addressArray: Array<Address> = [];
private dismissToast : boolean;
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

  ) { }


  ngAfterViewInit(): void {

    this.divConnectionAlert = document.getElementById("connection-alert");

 
    
    // 


    this.modalConnectionService.requestIntercepted.subscribe(backendDown => {
      if (backendDown) {
        this.htmlToAdd = '<h1 id="connection-text">Server caido</h1>';
        this.presentToastWithOptions("Oops!", "Server caido", "danger", "information-circle");

        this.divConnectionAlert.style.backgroundColor = "red";


        this.isOnline = false;
        this.dismissToast = false;
      }
      else {

        if (this.isOnline == false) {
          this.dismissToast = true;
          this.presentToastWithOptions("Solucionado!", "Conexion resuelta", "success", "checkmark-outline");
          this.htmlToAdd = '<h1 id="connection-text">Conexion resuelta</h1>';
          this.divConnectionAlert.style.backgroundColor = "green";
       
        }
      }

    });
    this.modalConnectionService.appIsOnline$.subscribe(online => {





      if (!online) {
        this.presentToastWithOptions("Atencion!", "No tienes conexion", "warning", "warning-outline");

        this.htmlToAdd = '<h1 id="connection-text">No tienes conexion</h1>';


        this.divConnectionAlert.style.backgroundColor = "red";


        this.isOnline = false;
        this.dismissToast = false;

      } else {

        if (this.isOnline == false) {
          this.dismissToast = true;
          this.presentToastWithOptions("Hurra!", "Vuelves a tener conexion", "success", "warning-outline");
          this.htmlToAdd = '<h1 id="connection-text">Vuelves a tener conexion</h1>';
          this.divConnectionAlert.style.backgroundColor = "green";
       
        }

      }

    })

    this.doConnection();
  }

  doConnection() {

    var divConnectionAlert = document.getElementById("connection-alert");
    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'local',
      wsHost: 'localhost',
      wsPort: 6001,
      forceTLS: false,
      disableStats: true
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


  updateData() {


    this.projectsService.getProjects().subscribe((p: Array<Project>) => {

      this.storage.set("projects", JSON.stringify(p));
      this.projectsArray = p;






    })

    this.addressServivce.getAddresses().subscribe((p: Array<AddressGroup>) => {

      this.storage.set("address", JSON.stringify(p));





    })

    this.playlistService.getPlaylists().subscribe((p: Array<Playlist>) => {

      this.storage.set("playlist", JSON.stringify(p));
      this.playlistArray = p;



    })

    this.sheduleService.getShedules().subscribe((p: Array<Shedule>) => {

      this.storage.set("shedule", JSON.stringify(p));
      this.sheduleArray = p;



    })

  }

  async presentToastWithOptions(header, message, color, icon) {
    
    try {
      this.toast.dismiss();
  } catch(e) {}
    this.toast = await this.toastController.create({
      header: header,
      message: message,
      color: color,
      icon: icon,
      position: 'bottom',

    });
    await this.toast.present()
if(this.dismissToast==true){
    setTimeout(() => {
      this.toast.dismiss();
      this.htmlToAdd = '';
      this.divConnectionAlert.style.backgroundColor = "transparent";
      this.isOnline = true;
    },
      8000);
  }
}


}









