
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Schedule } from '../../../../models/schedule';
import { SchedulesService } from '../../../../services/schedule/schedule.service';
import { Storage } from '@ionic/storage';
import { Echo } from 'laravel-echo-ionic';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  public scheduleArray: Array<Schedule> = [];
  public schedule: Schedule;
  project_id = this.activatedRoute.snapshot.paramMap.get('id');

  constructor(
    private scheduleService: SchedulesService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    public storage: Storage

  ) { }


  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {
    this.storage.get("scheduleProject").then(data => {
      if (data) {
        this.scheduleArray = JSON.parse(data);

      } else {


        this.updateData();
      }
    })
  }

  deleteSchedule(idSchedule: number) {
    this.scheduleService.deleteSchedule(idSchedule).subscribe(() => {
      this.loadInfo();
    });
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
    this.scheduleService.getSchedulesByProjectId(this.project_id).subscribe((s: Array<Schedule>) => {
      this.storage.set("scheduleProject", JSON.stringify(s));
      this.scheduleArray = s;

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