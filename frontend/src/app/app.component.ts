import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { GestureController, MenuController } from '@ionic/angular';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { ModalController } from '@ionic/angular';
import { DownloadOrSendModal } from './views/projects/reports/download-or-send-modal/download-or-send-modal.page';
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
import { WebsocketService } from './services/websocket/websocket.service';
import { InterceptorService } from './interceptors/interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  // @ViewChild('holdBtn', { read: ElementRef }) holdBtn: ElementRef;
  hold = 0;
  longPressActive = false;
  menuController: MenuController;
  isOnlineText: string;
  isOnline: boolean;
  htmlToAdd;

  private modalOpen: boolean = false;
  public sheduleArray: Shedule[] = [];
  public projectsArray: Project[] = [];
  public playlistArray: Array<Playlist> = [];
  public addressArray: Array<Address> = [];

  constructor(
    private gestureCtrl: GestureController,
    private pdfService: PdfService,
    private modalController: ModalController,
    private modalConnectionService: ModalConnectionService,
    private alertController: AlertController,
    private projectsService: ProjectsService,
    private sheduleService: SheduleService,
    private playlistService: PlaylistsService,
    private addressServivce: AddressService,
    public storage: Storage,
    private websocketService : WebsocketService,
    private interceptor : InterceptorService) { }


  ngOnInit() {


    window.onerror = function (error, url, line) {
      console.log(error, +url + line);


    };

   this.modalConnectionService.backendDownObs.subscribe((value) => { 
console.log("value");

    });
    this.modalConnectionService.appIsOnline$.subscribe(online => {



      var divConnectionAlert = document.getElementById("connection-alert");

      if (!online) {

        console.log(online);
        this.htmlToAdd = '<h1 id="connection-text">No tienes conexion</h1>';


        divConnectionAlert.style.backgroundColor = "red";


        this.isOnline = false;


      } else {
        console.log(online);
        if (this.isOnline == false) {
          this.htmlToAdd = '<h1 id="connection-text">Vuelves a tener conexion</h1>';
          divConnectionAlert.style.backgroundColor = "green";
          setTimeout(() => {
            this.htmlToAdd = '';
            divConnectionAlert.style.backgroundColor = "transparent";
            this.isOnline = true;
          },
            5000);
        }

      }

    })

    this.doConnection();
  }

  doConnection() {
 

    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'local',
      wsHost: 'localhost',
      wsPort: 6001,
      forceTLS: false,
      disableStats: true
    });
    // echo.connector.pusher.connection.bind('state_change', function(states) {
    //   if(states.current === 'disconnected') {
    //       echo.connector.pusher.connect();
    //   }
    // });

    echo.connector.pusher.connection.bind('unavailable', function () {
      var divConnectionAlert = document.getElementById("connection-alert");





      divConnectionAlert.innerHTML = '<h1 id="connection-text">No se puede establecer conexion con el servidor</h1>';


      divConnectionAlert.style.backgroundColor = "red";

    })

    echo.connector.pusher.connection.bind('failed', function () {
      var divConnectionAlert = document.getElementById("connection-alert");





      divConnectionAlert.innerHTML = '<h1 id="connection-text">La conexioni con el servidor fallo</h1>';


      divConnectionAlert.style.backgroundColor = "red";

    })

    echo.connector.pusher.connection.bind('disconnected', function () {
      var divConnectionAlert = document.getElementById("connection-alert");





      divConnectionAlert.innerHTML = '<h1 id="connection-text">Server caido</h1>';


      divConnectionAlert.style.backgroundColor = "red";

      echo.connector.pusher.connect();

      this.isOnline = false;

    });

    // echo.connector.pusher.connection.bind('error', this.state("serverDown"))

    echo.connector.pusher.connection.bind("error", function (error) {
  
      var divConnectionAlert = document.getElementById("connection-alert");



      console.error("connection error", error);

      divConnectionAlert.innerHTML = '<h1 id="connection-text">Server con errores</h1>';


      divConnectionAlert.style.backgroundColor = "red";



      this.isOnline = false;

    });

    echo.connector.pusher.connection.bind('connected', function () {
      console.log("eyy");
      
  

      var divConnectionAlert = document.getElementById("connection-alert");



        divConnectionAlert.innerHTML = '<h1 id="connection-text">Servidor levantado</h1>';
        divConnectionAlert.style.backgroundColor = "green";
        setTimeout(() => {
          this.htmlToAdd = '';
          divConnectionAlert.style.backgroundColor = "transparent";
          this.isOnline = true;
        },
          5000);
      
    });





    const channel = echo.channel('channel');
    channel.listen('Message', (data) => {
      console.log(JSON.stringify(data));
      this.notification(data);
      this.updateData();

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




}