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


  loadInfo() {
    db.collection('notifications').get().then(tasks => {
      this.notificationArray = tasks;

    })
  }

  onChange() {
if(this.isToggled){

  
this.userService.putUser(1);

}else if(!this.isToggled){
  this.userService.putUser(0);
}



  }

}

