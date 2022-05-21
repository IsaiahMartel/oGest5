import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public urlSplitArray: string[] = [];
  public id: number;
  public projectName: String;
  private projectId;

  constructor(
    private router: Router,
    public storage: Storage,
  

    private projectIdService: ProjectIdService
  ) {
    this.projectIdService;

  }


  ngOnInit() {

// Por si se recarga la página desde un proyecto
    if (this.projectIdService.projectId == null) {
      this.urlSplitArray = this.router.url.split("/");
      this.projectId = parseInt(this.urlSplitArray.slice(-1)[0]);
      this.projectIdService.getInterceptedSource().next(this.projectId);
      console.log(this.projectId);
      
    
    }

    this.projectIdService.requestIntercepted.subscribe((projectId) => {this.projectId=projectId});
  }

 
}