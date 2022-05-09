import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { GestureController, MenuController } from '@ionic/angular';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { ModalController } from '@ionic/angular';
import { DownloadOrSendModal } from './views/projects/reports/download-or-send-modal/download-or-send-modal.page';

import { ModalConnectionService } from './services/modal-connection/modal-connection.service';


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

  constructor(
    private gestureCtrl: GestureController,
    private pdfService: PdfService,
    private modalController: ModalController,
    private modalConnectionService: ModalConnectionService) { }

  ngOnInit() {
    window.onerror = function(error, url, line) {
      console.log(  error, +url+  line);
      
   
  };
    this.modalConnectionService.appIsOnline$.subscribe(online => {


var  divConnectionAlert = document.getElementById("connection-alert");
      if (!online) {
        this.htmlToAdd = '<h1 id="connection-text">No tienes conexion</h1>';
     
        console.log(divConnectionAlert);
        
       divConnectionAlert.style.backgroundColor= "red";
    
        
        this.isOnline = false;


      } else {
        if (this.isOnline == false) {
          this.htmlToAdd = '<h1 id="connection-text">Vuelves a tener conexion</h1>';
          divConnectionAlert.style.backgroundColor= "green";
          setTimeout(() => 
          {
            this.htmlToAdd = '';
            divConnectionAlert.style.backgroundColor= "transparent";
          },
          5000);
        }


      }

    })
  }


  // ngAfterViewInit() {
  //   const longPress = this.gestureCtrl.create({
  //     el: this.holdBtn.nativeElement,
  //     threshold: 0,
  //     gestureName: 'long-press',
  //     onStart: ev => {
  //       this.longPressActive = true;
  //       this.increase();

  //     },
  //     onEnd: ev => {
  //       this.longPressActive = false;

  //     }
  //   }, true);

  //   longPress.enable(true);

  // }

  // increase(timeout = 200) {
  //   setTimeout(() => {
  //     if (this.longPressActive) {
  //       this.hold++;

  //       this.increase(timeout);

  //     }
  //   }, timeout);
  //   if (this.hold == 4) {
  //     this.openModal();
  //     this.pdfService.category = 0;
  //     this.hold = 0;
  //   }


  // async openModal() {
  //   const modal = await this.modalController.create({
  //     component: DownloadOrSendModal,
  //     handle: false,
  //     initialBreakpoint: 0.16,
  //     breakpoints: [0, 0.16],
  //   });

  //   modal.onDidDismiss().then((o) => { this.modalOpen = false })

  //   if (!this.modalOpen) {
  //     this.modalOpen = true;

  //     return await modal.present();
  //   }
  // }



}