import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
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

  constructor(
    private router: Router,
    public storage: Storage,

    private projectIdService: ProjectIdService
  ) {
    this.projectIdService;

  }


  ngOnInit() {


    if (this.projectIdService.projectId == null) {
      this.urlSplitArray = this.router.url.split("/");
      this.projectIdService.changeProjectId(parseInt(this.urlSplitArray.slice(-1)[0]));
    }




  }
}