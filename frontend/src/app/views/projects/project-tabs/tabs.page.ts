import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
<<<<<<< HEAD
<<<<<<< HEAD
import { Project } from 'src/app/models/project';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';
import { ProjectsService } from 'src/app/services/projects/projects.service';
=======
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
=======
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public urlSplitArray: string[] = [];
  public id: number;
  public projectName: String;
<<<<<<< HEAD
<<<<<<< HEAD
  public projectId;
=======
  private projectId;
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
=======
  private projectId;
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5

  constructor(
    private router: Router,
    public storage: Storage,
  

<<<<<<< HEAD
<<<<<<< HEAD
    private projectIdService: ProjectIdService,
    private checkDataService: CheckDataService
=======
    private projectIdService: ProjectIdService
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
=======
    private projectIdService: ProjectIdService
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
  ) {
    this.projectIdService;

  }


  ngOnInit() {

// Por si se recarga la página desde un proyecto
<<<<<<< HEAD
<<<<<<< HEAD

=======
    if (this.projectIdService.projectId == null) {
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
=======
    if (this.projectIdService.projectId == null) {
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
      this.urlSplitArray = this.router.url.split("/");
      this.projectId = parseInt(this.urlSplitArray.slice(-1)[0]);
      this.projectIdService.getInterceptedSource().next(this.projectId);
      console.log(this.projectId);
<<<<<<< HEAD
<<<<<<< HEAD
      this.checkDataService.checkProjectsLocal();
    
      this.checkDataService.projectsObs.subscribe((projects) => {

        var array: Array<Project> = Object.values(projects);
        array.filter((project) => {
          if (project.id == this.projectId) {
            this.projectName = project.events.eventName;
          }})
        })

  
  }

 

 
=======
=======
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
      
    
    }

    this.projectIdService.requestIntercepted.subscribe((projectId) => {this.projectId=projectId});
  }

 
<<<<<<< HEAD
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
=======
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
}