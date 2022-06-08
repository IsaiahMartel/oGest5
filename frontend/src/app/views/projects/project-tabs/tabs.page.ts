import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';
import { ProjectsService } from 'src/app/services/projects/projects.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  public urlSplitArray: string[] = [];
  public id: number;
  public projectName: String;
  public projectId;
  subscription = new Subscription();
  subscription2 = new Subscription();
calendarButton; 
membersButton;
worksButton;
instrumentsButton;

  constructor(
    private router: Router,
    public storage: Storage,
    private projectIdService: ProjectIdService,
    private checkDataService: CheckDataService

  ) {
    this.projectIdService;
  }


  ngOnInit() {
    // Por si se recarga la página desde un proyecto
    this.urlSplitArray = this.router.url.split("/");
    this.projectId = parseInt(this.urlSplitArray.slice(-1)[0]);
    this.projectIdService.getInterceptedSource().next(this.projectId);

    this.checkDataService.checkProjectsLocal();

    this.subscription = this.checkDataService.projectsObs.subscribe((projects) => {
      var array: Array<Project> = Object.values(projects);
      array.filter((project) => {
        if (project.id == this.projectId) {
          this.projectName = project.events.eventName;
        }
      })
    })

    this.projectName = this.projectIdService.projectName;

  }

  ngAfterViewInit(): void {
    this.calendarButton = document.getElementById("calendar-button");
    this.membersButton = document.getElementById("members-button");
    this.worksButton = document.getElementById("works-button");
    this.instrumentsButton = document.getElementById("instruments-button");
    this.calendarButton
    .classList.add("tab-selected")
  }


  ionViewDidLeave() {
    this.subscription.unsubscribe();
   
  }

selected(element){
if(element==1){
  this.calendarButton
 .classList.add("tab-selected")
 this.membersButton
 .classList.remove("tab-selected")
 this.worksButton
 .classList.remove("tab-selected")
 this.instrumentsButton
 .classList.remove("tab-selected")
}else if(element==2){
  this.membersButton
 .classList.add("tab-selected")
 this.worksButton
 .classList.remove("tab-selected")
 this.instrumentsButton
 .classList.remove("tab-selected")
 this.calendarButton
 .classList.remove("tab-selected")

}else if(element==3){
  this.worksButton
 .classList.add("tab-selected")
 this.instrumentsButton
 .classList.remove("tab-selected")
 this.calendarButton
 .classList.remove("tab-selected")
 this.membersButton
 .classList.remove("tab-selected")

}else if(element==4){
  console.log("pasa");
  console.log( this.instrumentsButton);
  
  this.instrumentsButton
 .classList.add("tab-selected")
 this.calendarButton
 .classList.remove("tab-selected")
 this.membersButton
 .classList.remove("tab-selected")
 this.worksButton
 .classList.remove("tab-selected")
}
  
}
}