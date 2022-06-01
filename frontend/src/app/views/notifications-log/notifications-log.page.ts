import { Component, OnInit } from '@angular/core';
import Localbase from 'localbase';
let db = new Localbase('db');

@Component({
  selector: 'app-notifications-log',
  templateUrl: './notifications-log.page.html',
  styleUrls: ['./notifications-log.page.scss'],
})
export class NotificationsLogPage implements OnInit {

  notificationArray = [];
  constructor() { }

  ngOnInit() {

    this.loadInfo();
  }


  loadInfo() {
    db.collection('notifications').get().then(tasks => {
this.notificationArray=tasks;
    
    })
}
}

