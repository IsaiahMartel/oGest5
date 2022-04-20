
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Shedule } from 'src/app/models/shedule';
import { SheduleService } from 'src/app/services/shedule/shedule.service';
import { Storage } from '@ionic/storage';
import { Echo } from 'laravel-echo-ionic';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  public sheduleArray: Array<Shedule> = [];
  public shedule: Shedule;
  project_id = this.activatedRoute.snapshot.paramMap.get('id');

  constructor(
    private sheduleService: SheduleService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    public storage: Storage

  ) { }


  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {
    this.storage.get("shedule").then(data => {
      if (data) {
        var array = JSON.parse(data);


        array.filter((shedule) => {
     


          if (shedule.project_id == this.project_id) {
         
         

            return this.sheduleArray.push(shedule);
          };
        })
      } else {


        this.updateData();
      }
    })
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

    const channel = echo.channel('channel');
    channel.listen('Alert', (data) => {
      console.log(JSON.stringify(data));
      this.notification(data);
      this.updateData();
    });
  }

  updateData() {
    this.sheduleService.getShedules().subscribe((p: Array<Shedule>) => {

      this.storage.set("shedule", JSON.stringify(p));
      this.sheduleArray = p;
    })
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
}