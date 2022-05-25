import { AfterViewInit, Component, Inject, LOCALE_ID, Renderer2, ViewChild } from '@angular/core';
import { Shedule } from '../../models/shedule';
import { SheduleService } from '../../services/shedule/shedule.service';
import { Project } from '../../models/project';
import { ProjectsService } from '../../services/projects/projects.service';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { Playlist } from 'src/app/models/playlist';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address/address.service';
import { CalendarComponent } from 'ionic2-calendar';
import { Router } from '@angular/router';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';
import { combineLatestWith, Subscription } from 'rxjs';
import { CalendarMode, } from 'ionic2-calendar/calendar';



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
  private loading;
  private loadedViewTitleForTheFirstTime: number = 0;

  colorPick: number = 0;

  eventSource = [];
  viewTitle: string;
  time;
  calendar = {
    startingDayWeek: 1 as number,
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
    noEventsLabel: "No hay proyectos",
  };

  selectedDate: Date;
  subscription = new Subscription();


  mouseDownWholePageListener;
  mouseUpWholePageListener;
  calendarElement;
  spinner;
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
    private loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    private renderer: Renderer2

  ) { }

  ngOnInit(): void {
    this.loadInfo();


  }

  // Instanciamos los elementos que vamos a usar una vez cargada la página
  ionViewDidEnter() {
    this.onMouseDownWholePage = this.onMouseDownWholePage.bind(this);
    this.onMouseUpWholePage = this.onMouseUpWholePage.bind(this);
     window.addEventListener('mousedown', this.onMouseDownWholePage);
   window.addEventListener('mouseup', this.onMouseUpWholePage);
    this.calendarElement = document.getElementsByClassName('swiper-wrapper')[0];
    this.spinner = document.getElementById('div-spinner');
  }


  //Si se mantiene el click lo suficiente abre un sheet
  onMouseDownWholePage() {

    
    this.time = setTimeout(() => {
      this.presentActionSheet();
      this.time = null;
    },
      600);
  }

  //Si se suelta antes de tiempo no se hace nada
  onMouseUpWholePage() {    
    if (this.time) {
      clearTimeout(this.time);
      this.time = null;
    }
  }

  // Para ir hacia adelante en el calendario
  next() {
    this.myCal.slideNext();
    this.calendarElement.style.visibility = "hidden";
    this.spinner.style.visibility = "visible"
  }

  // Para ir hacia atrás en el calendario
  back() {
    this.myCal.slidePrev();
    this.calendarElement.style.visibility = "hidden";
    this.spinner.style.visibility = "visible"
  }

  // Cambia el nombre del mes al cambiarlo
  onViewTitleChanged(title) {
    // onViewTitleChanged se ejecuta antes de que se hayan cargado los elementos de la página
    if (this.calendarElement) {
      this.spinner.style.visibility = "hidden";
      this.calendarElement.style.visibility = "visible";
    }
    this.viewTitle = title;
  }

  // Creación de eventos y aignación de todos los atributos a cada proyecto y shedule
  createEvents() {

    var events = [];

    this.colorPick = 0;

    // Ordena los array por fechas
    this.projectsArray.sort((a, b) => new Date(a.projectDateIni).getTime() - new Date(b.projectDateEnd).getTime());
    // this.sheduleArray.sort((a, b) => new Date(a.sheduleDate).getTime() - new Date(b.sheduleDate).getTime());
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


            if (shedule.sheduleTipe == "CONCIERTO" || shedule.sheduleTipe.substring(0, 7) == "FUNCION"
              || shedule.sheduleTipe.substring(0, 7) == "FUNCIÓN") {
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
              || shedule.sheduleTipe.substring(0, 7) == "FUNCIÓN") {
              colorEvent = "redConcert";

            }
            else if (shedule.sheduleTipe == "DIA LIBRE") { colorEvent = "freeDay"; }
            else {
              colorEvent = "red";
            }

          }
          else if (this.colorPick == 2) {
            if (shedule.sheduleTipe == "CONCIERTO" || shedule.sheduleTipe.substring(0, 7) == "FUNCION"
              || shedule.sheduleTipe.substring(0, 7) == "FUNCIÓN") {
              colorEvent = "greenConcert";
            }
            else if (shedule.sheduleTipe == "DIA LIBRE") { colorEvent = "freeDay"; }
            else {
              colorEvent = "green";

            }

          }
          else if (this.colorPick == 3) {

            if (shedule.sheduleTipe == "CONCIERTO" || shedule.sheduleTipe.substring(0, 7) == "FUNCION"
              || shedule.sheduleTipe.substring(0, 7) == "FUNCIÓN") {
              colorEvent = "yellowConcert";
            }
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
    this.subscription = this.checkDataService.projectsObs.pipe(
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

  async presentActionSheet() {
    console.log(this.actionSheetController);



    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Cambiar colores',
        role: 'destructive',
        icon: 'color-palette-outline',
        handler: () => {
          this.router.navigateByUrl("/configuration");
        }
      },]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }


  ionViewDidLeave() {

    this.subscription.unsubscribe();
    window.removeEventListener('mousedown', this.onMouseDownWholePage);
    window.removeEventListener('mouseup', this.onMouseUpWholePage);
   
    
  }



}


