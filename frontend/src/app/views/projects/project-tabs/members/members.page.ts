import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DirectorProjects } from '../../../../models/director-projects';
import { DirectorProjectsService } from 'src/app/services/director-projects/director-projects.service';
import { SoloistProjects } from '../../../../models/soloist-projects';
import { SoloistProjectsService } from 'src/app/services/soloist/soloist-projects.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Echo } from 'laravel-echo-ionic';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  public directorProjectArray: Array<DirectorProjects> = [];
  project_id = this.activatedRoute.snapshot.paramMap.get('id');


  public soloistProjectArray: Array<SoloistProjects> = [];

  constructor(
    private directorProjectService: DirectorProjectsService,
    private activatedRoute: ActivatedRoute,
    private soloistProjectService: SoloistProjectsService,
    private alertController: AlertController,
    public storage: Storage

  ) { }


  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {
    this.storage.get("directorProject").then(data => {
      if (data) {
        this.directorProjectArray = JSON.parse(data);
      } else {
        this.updateData();

        
      }
    })

    this.storage.get("soloistProject").then(data => {
      if (data) {
        this.soloistProjectArray = JSON.parse(data);
      }else {
        this.updateData();
 
        
      }
    })
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
    this.directorProjectService.getDirectorProjectsByProjectId(this.project_id).subscribe((s: Array<DirectorProjects>) => {
      this.storage.set("directorProject", JSON.stringify(s));
      this.directorProjectArray = s;
    })

    this.soloistProjectService.getSoloistProjectsByProjectId(this.project_id).subscribe((s: Array<SoloistProjects>) => {
      this.storage.set("soloistProject", JSON.stringify(s));
      this.soloistProjectArray = s;
      
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
}