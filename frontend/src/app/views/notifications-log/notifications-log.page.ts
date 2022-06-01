import { Component, OnInit } from '@angular/core';
import Localbase from 'localbase';
import { UserService } from 'src/app/services/user/user.service';
let db = new Localbase('db');

@Component({
  selector: 'app-notifications-log',
  templateUrl: './notifications-log.page.html',
  styleUrls: ['./notifications-log.page.scss'],
})
export class NotificationsLogPage implements OnInit {
  public isToggled: boolean = true;
  notificationArray = [];
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.loadInfo();
  }


  loadInfo() {
    db.collection('notifications').get().then(tasks => {
      this.notificationArray = tasks;

    })
  }

  onChange() {
// if(this.isToggled){
// this.userService.

// }



  }

}

