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
    console.log(this.projectId);
    this.checkDataService.checkProjectsLocal();

    this.subscription = this.checkDataService.projectsObs.subscribe((projects) => {
      var array: Array<Project> = Object.values(projects);
      array.filter((project) => {
        if (project.id == this.projectId) {
          this.projectName = project.events.eventName;
        }
      })
    })
    this.projectIdService.requestIntercepted.subscribe((projectId) => { this.projectId = projectId });
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }
}