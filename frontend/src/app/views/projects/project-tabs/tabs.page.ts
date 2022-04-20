import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ProjectsService } from 'src/app/services/projects/projects.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public urlSplitArray: string[] = [];
  public id: string;
  public projectName: String;

  constructor(
    private router: Router,
    public storage: Storage,
    private projectsService: ProjectsService
  ) {


  }


  ngOnInit() {

    this.urlSplitArray = this.router.url.split("/");
    this.id = this.urlSplitArray.slice(-1)[0];
    console.log(this.id);

    this.storage.get("projects").then(data => {
      if (data) {
        var array = JSON.parse(data);


        array.filter((project) => {
        

          if (project.id == this.id) {
    
        

            this.projectName = project.events.eventName;
          




          };
        })
      }

    })

  }
}