import { Component, Inject, LOCALE_ID, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { combineLatestWith, Subscription } from 'rxjs';
import { Address } from 'src/app/models/address';
import { Playlist } from 'src/app/models/playlist';
import { AddressService } from 'src/app/services/address/address.service';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';
import { Project } from '../../models/project';
import { Shedule } from '../../models/shedule';
import { ProjectsService } from '../../services/projects/projects.service';
import { SheduleService } from '../../services/shedule/shedule.service';



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


  monthText: string;
  selectedDate: Date;
  calendar = {
    startingDayWeek: 1 as number,
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
    noEventsLabel: "No hay proyectos",
  };
  eventSource = [];

  // Para poder destruir las subscriptions y que no generen memory leak
  subscription = new Subscription();


  // Para que salga una rueda de loading cuando aún no está listo el calendario
  time;
  mouseDownWholePageListener;
  mouseUpWholePageListener;
  calendarElement;
  spinner;
  @ViewChild(CalendarComponent) myCal: CalendarComponent;


  constructor(
    private router: Router,
    public storage: Storage,
    public projectIdService: ProjectIdService,
    @Inject(LOCALE_ID) private locale: string,
    private checkDataService: CheckDataService,
    public actionSheetController: ActionSheetController,


  ) { }

  // Instanciamos los elementos que vamos a usar una vez cargada la página
  ionViewDidEnter() {
    this.onMouseDownWholePage = this.onMouseDownWholePage.bind(this);
    this.onMouseUpWholePage = this.onMouseUpWholePage.bind(this);
    window.addEventListener('touchstart', this.onMouseDownWholePage);
    window.addEventListener('touchend', this.onMouseUpWholePage);

    window.addEventListener('mousedown', this.onMouseDownWholePage);
    window.addEventListener('mouseup', this.onMouseUpWholePage);
    this.calendarElement = document.getElementsByClassName('swiper-wrapper')[0];
    this.spinner = document.getElementById('div-spinner');
  }

  ngOnInit(): void {
    this.loadInfo();
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
  onViewTitleChanged(month) {
    // onViewTitleChanged se ejecuta antes de que se hayan cargado los elementos de la página
    //por lo que tenemos que comprobar si existe el elemento calendario
    if (this.calendarElement) {
      this.spinner.style.visibility = "hidden";
      this.calendarElement.style.visibility = "visible";
    }
    this.monthText = month;
  }

  // Creación de eventos y aignación de todos los atributos a cada proyecto y shedule
  createEvents() {

    var events = [];

    var colorPick = 0;

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

          if (colorPick == 0) {
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
          } else if (colorPick == 1) {
            if (shedule.sheduleTipe == "CONCIERTO" || shedule.sheduleTipe.substring(0, 7) == "FUNCION"
              || shedule.sheduleTipe.substring(0, 7) == "FUNCIÓN") {
              colorEvent = "redConcert";
            }
            else if (shedule.sheduleTipe == "DIA LIBRE") { colorEvent = "freeDay"; }
            else {
              colorEvent = "red";
            }
          }
          else if (colorPick == 2) {
            if (shedule.sheduleTipe == "CONCIERTO" || shedule.sheduleTipe.substring(0, 7) == "FUNCION"
              || shedule.sheduleTipe.substring(0, 7) == "FUNCIÓN") {
              colorEvent = "greenConcert";
            }
            else if (shedule.sheduleTipe == "DIA LIBRE") { colorEvent = "freeDay"; }
            else {
              colorEvent = "green";

            }
          }
          else if (colorPick == 3) {
            if (shedule.sheduleTipe == "CONCIERTO" || shedule.sheduleTipe.substring(0, 7) == "FUNCION"
              || shedule.sheduleTipe.substring(0, 7) == "FUNCIÓN") {
              colorEvent = "yellowConcert";
            }
            else if (shedule.sheduleTipe == "DIA LIBRE") { colorEvent = "freeDay"; }
            else {
              colorEvent = "yellow";

            }

          }

          // Comprueba si existe shedule.rooms y/o shedule.sheduleNote para añadirlos
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

        // Reseteamos el color al primero (hay 4)
        if (colorPick == 4) {
          colorPick = 0;
        }
      })
      colorPick++;
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


  // Mmenú oculto para notificaciones y cambio de themes
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Notificaciones',
          icon: 'notifications-outline',
          handler: () => {
            this.router.navigateByUrl("/notifications");
          }
        },
        {
        text: 'Colores',
        icon: 'color-palette-outline',
        handler: () => {
          this.router.navigateByUrl("/themes");
        }
      },
      ]
    });
    await actionSheet.present();
  }

  // Destruye subscripciones y eventListeners para evitar memory leak
  ionViewDidLeave() {
    this.subscription.unsubscribe();
    window.removeEventListener('touchstart', this.onMouseDownWholePage);
    window.removeEventListener('touchend', this.onMouseUpWholePage);
    window.removeEventListener('mousedown', this.onMouseDownWholePage);
    window.removeEventListener('mouseup', this.onMouseDownWholePage);
  }



}


