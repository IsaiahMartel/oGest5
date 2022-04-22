import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { Shedule } from '../../models/shedule';
import { SheduleService } from '../../services/shedule/shedule.service';
import { Project } from '../../models/project';
import { ProjectsService } from '../../services/projects/projects.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Echo } from 'laravel-echo-ionic';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { Playlist } from 'src/app/models/playlist';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address/address.service';
import { CalendarComponent } from 'ionic2-calendar';
import { Router } from '@angular/router';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';
import { AddressGroup } from 'src/app/models/address-group';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public shedule: Shedule;
  public projects_id: number[] = [];
  public project: Project;
  public sheduleArray: Shedule[] = [];
  public projectsArray: Project[] = [];
  public playlistArray: Array<Playlist> = [];
  public addressArray: Array<Address> = [];
  
  colorPick = 0

  eventSource = [];
  viewTitle: string;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    noEventsLabel: "No hay eventos",
  };

  selectedDate: Date;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;


  constructor(
    private projectsService: ProjectsService,
    private sheduleService: SheduleService,
    private playlistService: PlaylistsService,
    private addressServivce: AddressService,
    private router: Router,
    private alertController: AlertController,
    public storage: Storage,
    public projectIdService: ProjectIdService,
    @Inject(LOCALE_ID) private locale: string,
  ) { }

  ngOnInit(): void {




    this.projectsService.getProjects().subscribe((p: Array<Project>) => {


      this.projectsArray = p.filter((project) => {

        this.projects_id.push(project.id);


      })
      this.loadInfo();
    })



  }

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }


  createEvents() {
    var events = [];


    for (let p of this.projectsArray) {

      var startDate = new Date(p.projectDateIni);
      var endDate = new Date(p.projectDateEnd);

      var title = p.events.eventName;
      var projectId = p.id;
      var blue;
      var green;
      var yellow;
      var red;
     this.sheduleArray.filter((shedule) => {
       shedule.sheduleTipe
      })
      // var eventType = 
      if (this.colorPick == 0) {
        
        var colorEvent = "blue";
        this.colorPick++;

      } else if (this.colorPick == 1) {
        var colorEvent = "red";
        this.colorPick++;
      }
      else if (this.colorPick == 2) {
        var colorEvent = "green";
        this.colorPick++;
      }
      else if (this.colorPick == 3) {
        var colorEvent = "yellow";
        this.colorPick=0;
      }

      events.push({
        title: title,
        startTime: startDate,
        endTime: endDate,
        projectId: projectId,
        colorEvent: colorEvent
      });
    }






    this.eventSource = events;






  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  loadInfo() {

    this.storage.get("projects").then(data => {

      if (data) {
        this.projectsArray = JSON.parse(data);
        this.createEvents();
      }

      else {
        this.updateData();
      }
    })
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: message,
      message: 'Inténtalo de nuevo.',
      buttons: ['OK']
    });

    await alert.present();
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
    console.log(this.projects_id);

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

  async notification(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Se han realizado cambios',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  onEventSelected = (event) => {
    this.projectIdService.changeProjectId(event.projectId);

    this.router.navigateByUrl("/tabs/calendar/" + event.projectId);

  };

getCustomClass(events) {
    if(events.length > 0) {
      return events[0].colorEvent;
    }
    return '';
  }



}


