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
  notificationStatus;
  private blockUntilLoaded = false;
  private subscription;
  private subscription1;
  private subscription2;
  private subscription3;
  constructor(private pushNotificationService: PushNotificationService) { }

  ngOnInit() {
    this.loadInfo();
  }

  async ngAfterViewInit(): Promise<void> {
    this.subscription = (await this.pushNotificationService.getNotificationStatus()).subscribe((observable) => {
      this.subscription1 = observable.subscribe((notificationStatus) => {

        if (notificationStatus == 1) {
          this.notificationStatus = true;
        } else if (notificationStatus == 0) {
          this.notificationStatus = false;
        }
        this.blockUntilLoaded = true;
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
    if (this.blockUntilLoaded == true) {
      if (this.isToggled) {
        this.subscription2 = (await this.pushNotificationService.silenceNotification(1)).subscribe((silence) => {
          silence.subscribe(() => {
          })
        });

      } else if (!this.isToggled) {
        this.subscription3 = (await this.pushNotificationService.silenceNotification(0)).subscribe((silence) => {
          silence.subscribe(() => {
          })
        });
      }
    }
  }

  ionViewDidLeave() {
    if (this.subscription != null) { this.subscription.unsubscribe(); }
    if (this.subscription1 != null) { this.subscription1.unsubscribe(); }
    if (this.subscription2 != null) { this.subscription2.unsubscribe(); }
    if (this.subscription3 != null) { this.subscription3.unsubscribe(); }

  }

}

