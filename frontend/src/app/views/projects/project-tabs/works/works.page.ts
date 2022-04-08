
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Playlists } from '../../../../models/playlists/playlists';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { Storage } from '@ionic/storage';
import { Echo } from 'laravel-echo-ionic';

@Component({
  selector: 'app-works',
  templateUrl: './works.page.html',
  styleUrls: ['./works.page.scss'],
})

export class WorksPage implements OnInit {
  public playlistArray: Array<Playlists> = [];
  public playlist: Playlists;
  project_id = this.activatedRoute.snapshot.paramMap.get('id');;

  constructor(
    private playlistService: PlaylistsService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    public storage: Storage
  ) { }

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {

    this.storage.get("playlistProject").then(data => {
      if (data) {

        this.playlistArray = JSON.parse(data);


      } else {

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
      this.playlistService.getPlaylistProjectsByProjectId(this.project_id).then(o => {
        o.subscribe((s: Array<Playlists>) => {
          this.storage.set("playlistProject", JSON.stringify(s));
          this.playlistArray = s;
        }
        )
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





