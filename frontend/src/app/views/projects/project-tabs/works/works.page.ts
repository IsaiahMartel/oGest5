
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { Storage } from '@ionic/storage';
import { Echo } from 'laravel-echo-ionic';

@Component({
  selector: 'app-works',
  templateUrl: './works.page.html',
  styleUrls: ['./works.page.scss'],
})

export class WorksPage implements OnInit {
  public playlistArray: Array<Playlist> = [];
  public playlist: Playlist;
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

    this.storage.get("playlist").then(data => {
      if (data) {
        var array = JSON.parse(data);


        array.filter((playlist) => {
     

          if (playlist.project_id == this.project_id) {
            console.log(playlist.project_id);


            return this.playlistArray.push(playlist);
          };
        })


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
    this.playlistService.getPlaylists().subscribe((p: Array<Playlist>) => {

      this.storage.set("playlist", JSON.stringify(p));
      this.playlistArray = p;
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





