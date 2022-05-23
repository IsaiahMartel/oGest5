import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { Shedule } from '../../models/shedule';
import { SheduleService } from '../../services/shedule/shedule.service';
import { Project } from '../../models/project';
import { ProjectsService } from '../../services/projects/projects.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { Playlist } from 'src/app/models/playlist';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address/address.service';
import { CalendarComponent } from 'ionic2-calendar';
import { Router } from '@angular/router';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';
import { AddressGroup } from 'src/app/models/address-group';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { of, combineLatestWith, pairs } from 'rxjs';
<<<<<<< HEAD
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
=======
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5



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
private innerHTMLCalendar;

  private loading;

  colorPick: number = 0;

  eventSource = [];
  viewTitle: string;

  calendar = {
<<<<<<< HEAD
    startingDayWeek: 1 as number,
    mode: 'month' as CalendarMode,
=======
    mode: 'month',
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
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
    private checkDataService: CheckDataService,
    private loadingController: LoadingController
  ) { }

  ngOnInit(): void {
    this.loadInfo();
  }

<<<<<<< HEAD
  
=======
  // async presentLoadingWithOptions() {
  //   var calendar = document.getElementsByClassName('swiper-wrapper') as HTMLCollectionOf<HTMLElement>;
  //   this.loading = await this.loadingController.create({

  //     spinner: "crescent",
  //     cssClass: 'loading',
  //     backdropDismiss: false,
  //     // showBackdrop: false,

  //   });


  //   // console.log(calendar);




  //   await this.loading.present();

  // if(this.dismissLoading==true){

  // }
  // const { role, data } = await loading.onDidDismiss();
  // console.log('Loading dismissed with role:', role);
  // }
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5

  // Para ir atrás en el calendario
  next() {
    this.myCal.slideNext();
<<<<<<< HEAD

    var calendar = document.getElementsByClassName('swiper-wrapper') as HTMLCollectionOf<HTMLElement>;


//  calendar[0].appendChild(div);
 calendar[0].style.visibility= "hidden";


=======
    // //  this.presentLoadingWithOptions();
    // var calendar = document.getElementsByTagName('monthview') as HTMLCollectionOf<HTMLElement>;
    var calendar = document.getElementsByClassName('swiper-wrapper') as HTMLCollectionOf<HTMLElement>;
    // // console.log(calendar);
    // // this.innerHTMLCalendar  = calendar[0];
    // var div = document.createElement("ion-spinner");
    // div.style.width = "100px";
    // div.style.height = "100px";
    // div.style.background = "red";
    // div.style.color = "white";
    // div.innerHTML = "hola";

//  calendar[0].appendChild(div);
 calendar[0].style.visibility= "hidden";
// calendar[0].innerHTML ='<ion-spinner name="crescent"></ion-spinner>'
    // calendar[0].style.visibility = "hidden";


    //  for (const tag of Array.from(calendar)) {
    //   var withoutDot = tag.innerHTML.substring(0, 1).toUpperCase();
    //   tag.innerHTML = withoutDot;
    //   tag.
    // }

    //  for (const tag of Array.from(weekDays)) {
    //   var withoutDot = tag.innerHTML.substring(0, 1).toUpperCase();
    //   tag.innerHTML = withoutDot;
    // }

>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5

    var spinner = document.getElementById('div-spinner').style.visibility="visible";
  }

  // Para ir adelante en el calendario
  back() {
    this.myCal.slidePrev();
    ////  this.presentLoadingWithOptions();
    // var calendar = document.getElementsByTagName('monthview') as HTMLCollectionOf<HTMLElement>;
    var calendar = document.getElementsByClassName('swiper-wrapper') as HTMLCollectionOf<HTMLElement>;
    // console.log(calendar);
    calendar[0].style.visibility= "hidden";
    document.getElementById('div-spinner').style.visibility="visible";
    
  }

  // Cambia el nombre del mes al cambiarlo
  onViewTitleChanged(title) {
    // var calendar = document.getElementsByTagName('monthview') as HTMLCollectionOf<HTMLElement>;
    var calendar = document.getElementsByClassName('swiper-wrapper') as HTMLCollectionOf<HTMLElement>;

    document.getElementById('div-spinner').style.visibility="hidden";
    calendar[0].style.visibility= "visible";
    // console.log(calendar);
    // calendar[0].innerHTML = ''
    // calendar[0].style.visibility = "visible";

    this.viewTitle = title;
    // console.log("hola");

    // this.dismissLoading();

  }

  async dismissLoading(): Promise<void> {
    if (this.loading) {
      this.loading.dismiss();
    }
  }


  // Creación de eventos y aignación de todos los atributos a cada proyecto y shedule
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
            if (shedule.sheduleTipe == "CONCIERTO" || shedule.sheduleTipe.substring(0, 7) == "FUNCION"
              || shedule.sheduleTipe.substring(0, 7) == "FUNCIÓN") { colorEvent = "redConcert"; }
            else if (shedule.sheduleTipe == "DIA LIBRE") { colorEvent = "freeDay"; }
            else {
              colorEvent = "red";
            }

          }
          else if (this.colorPick == 2) {
            if (shedule.sheduleTipe == "CONCIERTO" || shedule.sheduleTipe.substring(0, 7) == "FUNCION"
              || shedule.sheduleTipe.substring(0, 7) == "FUNCIÓN") { colorEvent = "greenConcert"; }
            else if (shedule.sheduleTipe == "DIA LIBRE") { colorEvent = "freeDay"; }
            else {
              colorEvent = "green";

            }

          }
          else if (this.colorPick == 3) {

            if (shedule.sheduleTipe == "CONCIERTO" || shedule.sheduleTipe.substring(0, 7) == "FUNCION"
              || shedule.sheduleTipe.substring(0, 7) == "FUNCIÓN") { colorEvent = "yellowConcert"; }
            else if (shedule.sheduleTipe == "DIA LIBRE") { colorEvent = "freeDay"; }
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

        if (this.colorPick == 4) {
          this.colorPick = 0;
        }

      })
      this.colorPick++;


    }

    this.eventSource = events;

    // Una vez se ha cargado el calendario se puede
    this.weekDaysToUpperCaseAndRemoveDots();
  }


  weekDaysToUpperCaseAndRemoveDots() {
    var weekDays = document.getElementsByTagName("small");
    for (const tag of Array.from(weekDays)) {
      var withoutDot = tag.innerHTML.substring(0, 1).toUpperCase();
      tag.innerHTML = withoutDot;
    }
  }


  // Pasa los datos desde el local storage de shedule y projects a un array
  loadInfo() {

    this.checkDataService.checkProjectsLocal();
    this.checkDataService.checkSheduleLocal();
    this.checkDataService.projectsObs.pipe(
      combineLatestWith(this.checkDataService.sheduleObs)

    ).subscribe(([projectsArray, sheduleArray]) => {
      this.projectsArray = Object.values(projectsArray);
      this.sheduleArray = Object.values(sheduleArray);

      this.createEvents();

    })

  }


  // Navegación al proyecto seleccionado
  eventSelected = (event) => {
    this.projectIdService.getInterceptedSource().next(event.projectId);

    this.router.navigateByUrl("/tabs/calendar/" + event.projectId);

  };

  // Pinta los colores en el calendario
  printColorsInDaysWithEvents(events) {

    if (events.length > 0) {

      for (let event of events) {


        if (event.titleShedule) {


          // Pinta tan solo los días con estos valores, y no se tocan más ya que se pueden sobreescribir 
          if (event.titleShedule == "CONCIERTO" || event.titleShedule == "DIA LIBRE" || event.titleShedule.substring(0, 7) == "FUNCION"
            || event.titleShedule.substring(0, 7) == "FUNCIÓN") {


            return event.colorEvent;

          }
        }
      }

      // Pinta el color en el resto de días normales
      return events[1].colorEvent;
    }
    return '';
  }

  // Calcula la diiferencia entre días
  dateDiffInDays(a, b) {

    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());


    return (Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24)) + 1);
  }

}


