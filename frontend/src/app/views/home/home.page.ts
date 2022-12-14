import { Component, Inject, LOCALE_ID, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { ActionSheetController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { combineLatestWith, Subscription } from 'rxjs';
import { Address } from 'src/app/models/address';
import { Playlist } from 'src/app/models/playlist';
import { AddressService } from 'src/app/services/address/address.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';
import { PushNotificationService } from 'src/app/services/push-notification/push-notification.service';
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


  private ionAlert;
  // Alertas que salen en la parte inferior de la pantalla
  private fadeToast: boolean;
  private toast;
  isOnline: boolean;

  monthText: string;
  selectedDate: Date;
  calendar = {

    mode: 'month' as CalendarMode,
    currentDate: new Date(),
    noEventsLabel: "No hay proyectos",
    startingDayMonth: 1 as number,
  };
  eventSource = [];

  // Para poder destruir las subscriptions y que no generen memory leak
  subscription = new Subscription();
  subscription1 = new Subscription();
  public readonly vapidNotificationPublicKey = "BA15WyNaTv36X9A86QEjVWjiq5xfiC6nrpIxedhLV9lt4c0WZrko06ir6hJpFej6aazbCVzwgTWVVqoZWVLO5ps";

  // Para que salga una rueda de loading cuando a??n no est?? listo el calendario
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
    private swPush: SwPush, private pushNotificationService: PushNotificationService,
    private toastController: ToastController,
    private alertController: AlertController,
    private authService: AuthService,



  ) { }

  // Instanciamos los elementos que vamos a usar una vez cargada la p??gina
  ionViewDidEnter() {
    this.onMouseDownWholePage = this.onMouseDownWholePage.bind(this);
    this.onMouseUpWholePage = this.onMouseUpWholePage.bind(this);
    window.addEventListener('touchstart', this.onMouseDownWholePage);
    window.addEventListener('touchend', this.onMouseUpWholePage);

    window.addEventListener('mousedown', this.onMouseDownWholePage);
    window.addEventListener('mouseup', this.onMouseUpWholePage);
    this.calendarElement = document.getElementsByClassName('swiper-wrapper')[0];
    this.spinner = document.getElementById('div-spinner');



    // eventDetail.innerHTML = eventDetail.innerHTML.replace(/,/g, ',<br/>')
  }

  ngOnInit(): void {
    navigator.serviceWorker.ready.then(() => {
      document.body.style.setProperty('--visibilityBody', "visible");
      document.body.style.setProperty('--visibilitySpinner', "hidden");
      this.subscribeToNotifications();
      this.loadInfo();
    })


  }

  subscribeToNotifications(): any {

    // Comprobaci??n de si las notificaciones est??n activadas
    this.swPush.subscription.subscribe(subscription => {

      if (subscription == null) {
        this.alert("??Atenci??n!", "Debes aceptar las notificaciones para usar esta app", 'Haz click en "Permitir" en la ventana de notficaciones', [
          {
            text: 'Tutorial',

            cssClass: 'secondary',
            id: 'android-button',
            handler: () => {
              this.router.navigateByUrl("/android-notification-tutorial")
            }
          },],
        );

      } 

     

      


    }



    );


    this.storage.get("mobileEmail").then(email => {
      // Guardamos la subscripci??n de la notificaci??n en la base de datos
      this.swPush.requestSubscription({
        serverPublicKey: this.vapidNotificationPublicKey
      }).then(sub => {
        this.pushNotificationService.postNotificationToken(sub,email).subscribe();
        ;
      })
    })
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
      1000);
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

  // Para ir hacia atr??s en el calendario
  back() {
    this.myCal.slidePrev();
    this.calendarElement.style.visibility = "hidden";
    this.spinner.style.visibility = "visible"
  }

  // Cambia el nombre del mes al cambiarlo
  onViewTitleChanged(month) {
    // onViewTitleChanged se ejecuta antes de que se hayan cargado los elementos de la p??gina
    //por lo que tenemos que comprobar si existe el elemento calendario
    if (this.calendarElement) {
      this.spinner.style.visibility = "hidden";
      this.calendarElement.style.visibility = "visible";
    }
    this.monthText = month;
  }

  // Creaci??n de eventos y aignaci??n de todos los atributos a cada proyecto y shedule
  createEvents() {

    var events = [];

    var colorPick = 0;

    // Ordena los array por fechas
    this.projectsArray.sort((a, b) => new Date(a.projectDateIni).getTime() - new Date(b.projectDateEnd).getTime());

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
              || shedule.sheduleTipe.substring(0, 7) == "FUNCI??N") {
              colorEvent = "firstProjectImportant";
            }
            else if (shedule.sheduleTipe == "DIA LIBRE") {
              colorEvent = "freeDay";

            }
            else {
              colorEvent = "firstProject";
            }
          } else if (colorPick == 1) {
            if (shedule.sheduleTipe == "CONCIERTO" || shedule.sheduleTipe.substring(0, 7) == "FUNCION"
              || shedule.sheduleTipe.substring(0, 7) == "FUNCI??N") {
              colorEvent = "secondProjectImportant";
            }
            else if (shedule.sheduleTipe == "DIA LIBRE") { colorEvent = "freeDay"; }
            else {
              colorEvent = "secondProject";
            }
          }
          else if (colorPick == 2) {
            if (shedule.sheduleTipe == "CONCIERTO" || shedule.sheduleTipe.substring(0, 7) == "FUNCION"
              || shedule.sheduleTipe.substring(0, 7) == "FUNCI??N") {
              colorEvent = "thirdProjectImportant";
            }
            else if (shedule.sheduleTipe == "DIA LIBRE") { colorEvent = "freeDay"; }
            else {
              colorEvent = "thirdProject";

            }
          }
          else if (colorPick == 3) {

            if (shedule.sheduleTipe == "CONCIERTO" || shedule.sheduleTipe.substring(0, 7) == "FUNCION"
              || shedule.sheduleTipe.substring(0, 7) == "FUNCI??N") {
              colorEvent = "fourthProjectImportant";
            }
            else if (shedule.sheduleTipe == "DIA LIBRE") { colorEvent = "freeDay"; }
            else {
              colorEvent = "fourthProject";

            }

          }

          // Comprueba si existe shedule.rooms y/o shedule.sheduleNote para a??adirlos
          if (shedule.rooms) {
            roomAcronym = shedule.rooms.roomAcronym;
          }
          if (shedule.sheduleNote) {

            sheduleNote = shedule.sheduleNote;
            sheduleNote = shedule.sheduleNote.replace(/<\/?[^>]+(>|$)/g, "");
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


  }


  // Navegaci??n al proyecto seleccionado
  eventSelected = (event) => {
    this.projectIdService.getInterceptedSource().next(event.projectId);

    this.router.navigateByUrl("/tabs/calendar/" + event.projectId);

  };

  // Pinta los colores en el calendario
  printColorsInDaysWithEvents(events) {
    if (events.length > 0) {
      for (let event of events) {
        if (event.titleShedule) {

          // Pinta tan solo los d??as con estos valores, y no se tocan m??s ya que se pueden sobreescribir 
          if (event.titleShedule == "CONCIERTO" || event.titleShedule == "DIA LIBRE" || event.titleShedule.substring(0, 7) == "FUNCION"
            || event.titleShedule.substring(0, 7) == "FUNCI??N") {
            return event.colorEvent;
          }
        }
      }

      // Pinta el color en el resto de d??as normales
      return events[1].colorEvent;
    }
    return '';
  }

  // Calcula la diiferencia entre d??as
  dateDiffInDays(a, b) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return (Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24)) + 1);
  }


  // Mmen?? oculto para notificaciones y cambio de themes
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
    this.subscription1.unsubscribe();
    window.removeEventListener('touchstart', this.onMouseDownWholePage);
    window.removeEventListener('touchend', this.onMouseUpWholePage);
    window.removeEventListener('mousedown', this.onMouseDownWholePage);
    window.removeEventListener('mouseup', this.onMouseDownWholePage);
    document.body.style.setProperty('--visibilityBody', "visible");
    document.body.style.setProperty('--visibilitySpinner', "hidden");
    console.log("ionviewdidleave home");

  }


  async presentToastWithOptions(header, message, color, icon) {
    // Elimina el mensaje anterior si lo hubiera
    try {
      this.toast.dismiss();
    } catch (e) { }

    this.toast = await this.toastController.create({
      header: header,
      message: message,
      color: color,
      icon: icon,
      position: 'bottom',
    });
    await this.toast.present()

    // El mensaje se mantiene unos segundos cuando vuelve a haber conexi??n
    if (this.fadeToast == true) {
      setTimeout(() => {
        this.toast.dismiss();
        this.isOnline = true;
      },
        8000);
    }
  }

  async alert(header: string, subHeader: string, message: string, buttons,) {
    this.ionAlert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons,
      backdropDismiss: false,
    });

    await this.ionAlert.present();
  }
}

