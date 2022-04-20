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
  public project = [];

  constructor(
    private router: Router, 
    public storage: Storage,
    private projectsService: ProjectsService
    ) {

    this.urlSplitArray = this.router.url.split("/");
    this.id = this.urlSplitArray.slice(-1)[0];
    console.log(this.id);
  }


  ngOnInit() {
    this.storage.get("projects").then(data => {
      if (data) {
        var array = JSON.parse(data);


        array.filter((project) => {


          if (project.id == this.id) {



        this.project = project;
        console.log(this.project);

        
        
          };
        })
      }

    })

  }
}