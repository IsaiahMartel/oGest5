import { Component, OnInit } from '@angular/core';
import Localbase from 'localbase';
import { PushNotificationService } from '../../services/push-notification/push-notification.service'
let db = new Localbase('db');

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  public isToggled: boolean = true;
  notificationArray = [];
  notificationStatus ;
  private subscription;
  private subscription1;
  private subscription2;
  private subscription3;
  constructor(private pushNotificationService: PushNotificationService) { }

  ngOnInit() {
    this.loadInfo();
  }

  async ngAfterViewInit(): Promise<void> {

   this.subscription= (await this.pushNotificationService.getNotificationStatus()).subscribe((observable) => {


     this.subscription1= observable.subscribe((notificationStatus) => {

        if (notificationStatus == 1) {
          this.notificationStatus = true;
        } else if (notificationStatus == 0) {
          this.notificationStatus = false;
   
          
        }

      })

    })



  }

  // Almaceno las notificaciones en un array para el historial de notificaciones
  loadInfo() {
    db.collection('notifications').get().then(tasks => {
      this.notificationArray = tasks;
    })
  }

  // Para silenciar las notificaciones
 async onChange() {
    if (this.isToggled) {
   this.subscription2=   (await this.pushNotificationService.silenceNotification(1)).subscribe((silencio)=>{
        console.log(silencio);
        
      });

    } else if (!this.isToggled) {
    this.subscription3=  this.pushNotificationService.silenceNotification(0);
    }



  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }

}

