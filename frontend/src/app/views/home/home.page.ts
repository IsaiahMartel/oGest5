import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { Schedule } from '../../models/schedule';
import { SchedulesService } from '../../services/schedule/schedule.service';
import { Projects } from '../../models/projects';
import { ProjectsService } from '../../services/projects/projects.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Echo } from 'laravel-echo-ionic';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { DirectorProjectsService } from 'src/app/services/director-projects/director-projects.service';
import { SoloistProjects } from 'src/app/models/soloist-projects';
import { SoloistProjectsService } from 'src/app/services/soloist/soloist-projects.service';
import { Playlists } from 'src/app/models/playlists/playlists';
import { DirectorProjects } from 'src/app/models/director-projects';
import { CalendarComponent } from 'ionic2-calendar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public schedule: Schedule;
  public projects_id: number[] = [];
  public projects: Projects;
  public scheduleArray: Schedule[] = [];
  public projectsArray: Projects[] = [];
  public playlistArray: Array<Playlists> = [];
  public directorProjectArray: Array<DirectorProjects> = [];
  public soloistProjectArray: Array<SoloistProjects> = [];
  eventSource = [];
  viewTitle: string;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    // noEventsLabel: "No hay eventos"
    noEventsLabel: "No hay eventos"
  };

  selectedDate: Date;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 

  constructor(
    private projectsService: ProjectsService,
    private scheduleService: SchedulesService,
    private playlistService: PlaylistsService,
    private directorProjectService: DirectorProjectsService,
    private soloistProjectService: SoloistProjectsService,

    private router: Router,


    private alertController: AlertController,
    public storage: Storage,
    @Inject(LOCALE_ID) private locale: string,
  ) { }

  ngOnInit(): void {

    
   

    this.projectsService.getProjects().subscribe((p: Array<Projects>) => {


      this.projectsArray = p.filter((project) => {
        if (project.published == true) {
          this.projects_id.push(project.id);
        }

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
    // console.log(this.projectsArray);

    for (let p of this.projectsArray) {
      // console.log(p);

      var startDate = new Date(p.startDateProject);
      var endDate = new Date(p.endDateProject);

      var title = p.nameProject;
      var projectId = p.id;

      events.push({
        title: title,
        startTime: startDate,
        endTime: endDate,
        projectId: projectId,
      });
    }





    this.eventSource = events;
    console.log(this.eventSource);
    




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
    for (let i of this.projects_id) {
      // this.scheduleService.getSchedulesByProjectId(i).subscribe((s: Array<Schedule>) => {
      //   for (let j of s) {
      //     this.storage.set("schedulesHome", JSON.stringify(s));
      //     this.scheduleArray.push(j);
      //   }
      // });

      this.playlistService.getPlaylistProjectsByProjectId(i).then(o => {
        o.subscribe((s: Array<Playlists>) => {
          for (let j of s) {
            this.storage.set("playlistProject", JSON.stringify(s));
            this.playlistArray.push(j);

          }
        }
        )
      })

      this.directorProjectService.getDirectorProjectsByProjectId(i).subscribe((s: Array<DirectorProjects>) => {
        for (let j of s) {
          this.storage.set("directorProject", JSON.stringify(s));
          this.directorProjectArray.push(j);
        }
      })

      this.soloistProjectService.getSoloistProjectsByProjectId(i).subscribe((s: Array<SoloistProjects>) => {
        for (let j of s) {
          this.storage.set("soloistProject", JSON.stringify(s));
          this.soloistProjectArray.push(j);

        }
      })

      this.scheduleService.getSchedulesByProjectId(i).subscribe((s: Array<Schedule>) => {
        for (let j of s) {
          this.storage.set("scheduleProject", JSON.stringify(s));
          this.scheduleArray.push(j);


        }
        // this.createEvents();
      })
    }

    this.projectsService.getProjects().subscribe((p: Array<Projects>) => {
      this.storage.set("projects", JSON.stringify(p));
      this.projectsArray = p.filter((project) => {
        return project.published == true;
      })

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
  // updateCalendar() {
  //   const cells = document.getElementsByClassName("swiper-container-initialized");
  //   const slider = document.getElementsByClassName('event-detail-container');
  //   const slides = slider[0].getElementsByClassName('item')
  //   // console.log(slider[0])
  //   // console.log(cells);



  //   // for (let i = 0; i < cells.length; i++) {
  //   const cell = cells[0] as HTMLElement;

  //   // console.log(cell);


  //   cell.addEventListener('click', function handleClick() {
  //     console.log("ha hecho click");


  //     for (let i = 0; i < slides.length; i++) {
  //       // console.log(slides);

  //       // setTimeout(function () {
  //       const slide = slides[i] as HTMLElement;


  //       slide.setAttribute("href", "/tabs/calendar/")
  //       // }, 2000);




  //     };
  //   });

  //   // };

  //   // console.log(slides[0].getElementsByClassName('item'));

  // }

  onEventSelected = (event) => {
   this.router.navigateByUrl("/tabs/calendar/" + event.projectId);
   
  };


  
}


