import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { Shedule } from '../../models/shedule';
import { SheduleService } from '../../services/shedule/shedule.service';
import { Project } from '../../models/project';
import { ProjectsService } from '../../services/projects/projects.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

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

  ) { }

  ngOnInit(): void {
    this.loadInfo();
  }

  // Para ir atrás en el calendario
  next() {
    this.myCal.slideNext();
  }

  // Para ir adelante en el calendario
  back() {
    this.myCal.slidePrev();
  }

  // Cambia el nombre del mes al cambiarlo
  onViewTitleChanged(title) {
    this.viewTitle = title;

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

    this.storage.get("shedule").then(data => {

      if (data) {
        this.sheduleArray = JSON.parse(data);

        this.storage.get("projects").then(data => {

          if (data) {
            this.projectsArray = JSON.parse(data);
            this.createEvents();
          }

          else {
            // Si no tiene los datos, los va a buscar
            this.getData();
          }
        })

      }

      else {
        // Si no tiene los datos, los va a buscar
        this.getData();
      }
    })
  }


  // Va a buscar los datos al backend
  getData() {
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

  // Navegación al proyecto seleccionado
  eventSelected = (event) => {
    this.projectIdService.changeProjectId(event.projectId);

    this.router.navigateByUrl("/tabs/calendar/" + event.projectId);

  };

// Pinta los colores en el calendario
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

// Calcula la diiferencia entre días
  dateDiffInDays(a, b) {

    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());


    return (Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24)) + 1);
  }

}


