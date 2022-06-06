import { Component, OnInit } from '@angular/core';
import Localbase from 'localbase';
import { UserService } from 'src/app/services/user/user.service';
let db = new Localbase('db');

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  public isToggled: boolean = true;
  notificationArray = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadInfo();
  }

// Almaceno las notificaciones en un array para el historial de notificaciones
  loadInfo() {
    db.collection('notifications').get().then(tasks => {
      this.notificationArray = tasks;
    })
  }

  // Para silenciar las notificaciones
  onChange() {
if(this.isToggled){
this.userService.putUser(1);

}else if(!this.isToggled){
  this.userService.putUser(0);
}



  }

}

