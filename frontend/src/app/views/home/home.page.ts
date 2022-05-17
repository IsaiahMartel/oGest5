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
import { LoginPage } from '../login/login.page';

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
  private isEverythingSaved = 0;

private weekDaysQuerySelector = document.querySelector("small")
  colorPick: number = 0;

  eventSource = [];
  viewTitle: string;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    noEventsLabel: "No hay proyectos",
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

  ) {  }

  ngOnInit(): void {
//     const weekDays = document.getElementsByTagName("small");
// console.log(weekDays);






// for(let element of this.weekDays){
//   console.log(element);
// }
// console.log(this.weekDays);
// console.log(this.weekDaysQuerySelector);



const elements: Element[] = Array.from( document.getElementsByTagName("small"));
console.log(elements);
elements.forEach((el: Element) => {
console.log("xd");

})

const inputs = document.getElementsByTagName("small");
for (let index = 0; index < inputs.length; index++) {
  const input = inputs.item(index);
  console.log("xd");
  
}
// for (const tag of Array.from(this.weekDays)) {
//   console.log("Xd");
  
// }

// for (const element in this.weekDays) {
//   // for(var i =0; i<5;i++)
//   // console.log(element[i]);
//   // console.log(this.weekDays[i]);
  
//   // console.log("Xd");
  
// }

// Array.from(this.weekDays).forEach((el) =>
// console.log(el)

// );

// for(var i=0; i<35;i++){
//   console.log(this.weekDays.item(i));
  
  
// }

    // this.projectsService.getProjects().subscribe((p: Array<Project>) => {


    //   this.projectsArray = p.filter((project) => {

    //     this.projects_id.push(project.id);


    //   })
      this.loadInfo();
    // })
    console.log( document.querySelectorAll("small"));


  }

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }


  createEvents() {

    
    var events = [];

    this.colorPick = 0;

    this.projectsArray.sort((a, b) => new Date(a.projectDateIni).getTime() - new Date(b.projectDateEnd).getTime());
    this.sheduleArray.sort((a, b) => new Date(a.sheduleDate).getTime() - new Date(b.sheduleDate).getTime());
    for (let project of this.projectsArray) {
      var startDateProject = new Date(project.projectDateIni);

      var endDateProject = new Date(project.projectDateEnd);
      var diffTime = this.dateDiffInDays(startDateProject, endDateProject);
      var day = 60 * 60 * 24 * 1000;
      var colorEvent = "";
      var titleShedule = "";
      var startDateShedule;
      var endDateShedule;
      var sheduleHour = "";
      var roomAcronym = "";
      var sheduleNote = "";


      for (let i = 0; i < diffTime; i++) {

        var dayByDay = new Date(startDateProject.getTime() + day * i);


        events.push({
          title: project.events.eventName,
          startTime: dayByDay,
          endTime: dayByDay,
          projectId: project.id,

        });




      }

      this.sheduleArray.filter((shedule) => {

        if (shedule.project_id == project.id) {




          startDateShedule = new Date(shedule.sheduleDate);
          endDateShedule = new Date(shedule.sheduleDate);
          titleShedule = shedule.sheduleTipe;
          sheduleHour = shedule.shedulehourRange;






          if (this.colorPick == 0) {


            if (shedule.sheduleTipe == "CONCIERTO") {
              colorEvent = "blueConcert";

            }
            else if (shedule.sheduleTipe == "DIA LIBRE") {
              colorEvent = "freeDay";

            }
            else {
              colorEvent = "blue";

            }

          } else if (this.colorPick == 1) {
            if (shedule.sheduleTipe == "CONCIERTO") { var colorEvent = "redConcert"; }
            else if (shedule.sheduleTipe == "DIA LIBRE") { var colorEvent = "freeDay"; }
            else {
              colorEvent = "red";
            }

          }
          else if (this.colorPick == 2) {
            if (shedule.sheduleTipe == "CONCIERTO") { var colorEvent = "greenConcert"; }
            else if (shedule.sheduleTipe == "DIA LIBRE") { var colorEvent = "freeDay"; }
            else {
              colorEvent = "green";

            }

          }
          else if (this.colorPick == 3) {
            if (shedule.sheduleTipe == "CONCIERTO") { var colorEvent = "yellowConcert"; }
            else if (shedule.sheduleTipe == "DIA LIBRE") { var colorEvent = "freeDay"; }
            else {
              colorEvent = "yellow";

            }

          }


          if (shedule.rooms) {
            roomAcronym = shedule.rooms.roomAcronym;
          }
          if (shedule.sheduleNote) {
            sheduleNote = shedule.sheduleNote;
          }




          events.push({
            titleShedule: titleShedule,
            startTime: startDateShedule,
            endTime: endDateShedule,
            sheduleHour: sheduleHour,
            sheduleNote: sheduleNote,
            roomAcronym: roomAcronym,
            colorEvent: colorEvent,
            projectId: project.id,
          });


        }

        if (this.colorPick == 3) {
          this.colorPick = 0;
        }


      })
      this.colorPick++;




    }
var   weekDays = document.getElementsByTagName("small");

    this.eventSource = events;
  for (const tag of Array.from(weekDays)) {
var withoutDot =tag.innerHTML.substring(0,1).toUpperCase();
  tag.innerHTML= withoutDot;
}

  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  loadInfo() {

    this.storage.get("shedule").then(data => {

      if (data) {
        this.sheduleArray = JSON.parse(data);

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




  updateData() {
 

      this.projectsService.getProjects().subscribe((p: Array<Project>) => {

        this.storage.set("projects", JSON.stringify(p));
        this.projectsArray = p;
       
     
     
          
          this.createEvents;
    
      })

      this.addressServivce.getAddresses().subscribe((p: Array<AddressGroup>) => {

        this.storage.set("address", JSON.stringify(p));
    
       

          this.createEvents;
    
      })

      this.playlistService.getPlaylists().subscribe((p: Array<Playlist>) => {

        this.storage.set("playlist", JSON.stringify(p));
        this.playlistArray = p;
       
          this.createEvents;
    
      })

      this.sheduleService.getShedules().subscribe((p: Array<Shedule>) => {

        this.storage.set("shedule", JSON.stringify(p));
        this.sheduleArray = p;
  
  this.createEvents();

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

  eventSelected = (event) => {




    this.projectIdService.changeProjectId(event.projectId);

    this.router.navigateByUrl("/tabs/calendar/" + event.projectId);

  };


  getCustomClass(events) {
    if (events.length > 0) {

      for (let event of events) {
        if (event.titleShedule) {
          if (event.titleShedule == "CONCIERTO" || event.titleShedule == "DIA LIBRE") {

            return event.colorEvent;

          }
        }
      }
      if (events.length >= 1) {

        return events[1].colorEvent;
      }

      return events[0].colorEvent;

    }
    return '';
  }

  dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());


    return (Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24)) + 1);
  }

}


