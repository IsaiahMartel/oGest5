import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Playlist } from 'src/app/models/playlist';

import { Storage } from '@ionic/storage';
import { Echo } from 'laravel-echo-ionic';

import { PlaylistsService } from 'src/app/services/playlists/playlists.service';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.page.html',
  styleUrls: ['./instruments.page.scss'],
})
export class InstrumentsPage implements OnInit {
  public playlistArray: Array<Playlist> = [];
  public playlist: Playlist;
  project_id = this.activatedRoute.snapshot.paramMap.get('id');

  public showPercussion = false;
  public showVoice = false;
  public showKeyboard = false;
  public noPercussion = true;
  public noVoice = true;
  public noKeyboard = true;
  perArray = [];
  keyArray = [];
  voiArray = [];

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



            if (playlist.perplaylists != null || playlist.voiplaylists != null || playlist.keyplaylists != null) {
             
              this.playlistArray.push(playlist);


            }


          };

        })

        for (let playlist of this.playlistArray) {

          for (let perplaylist in playlist.perplaylists) {
            if (playlist.perplaylists[perplaylist].instrumentName != null || playlist.perplaylists[perplaylist].instrumentName2 != null) {
              this.noPercussion = false;
              if(!this.perArray.includes(playlist.perplaylists[perplaylist].instrumentName) || !this.perArray.includes(playlist.perplaylists[perplaylist].instrumentName2)){
              this.perArray.push(playlist.perplaylists[perplaylist]);
              }
            }
     
          }
          for (let keyplaylist in playlist.keyplaylists) {
            if (playlist.keyplaylists[keyplaylist].instrumentName != null || playlist.keyplaylists[keyplaylist].instrumentName2 != null) {
              this.noKeyboard = false;
              if(!this.perArray.includes(playlist.keyplaylists[keyplaylist].instrumentName) || !this.perArray.includes(playlist.keyplaylists[keyplaylist].instrumentName2)){
                this.keyArray.push(playlist.keyplaylists[keyplaylist]);
                console.log(playlist.keyplaylists[keyplaylist]);
                
                }
            }
          }
          for (let voiplaylist in playlist.voiplaylists) {
            if (playlist.voiplaylists[voiplaylist].instrumentName != null || playlist.voiplaylists[voiplaylist].instrumentName2 != null) {
              this.noVoice = false;
              if(!this.voiArray.includes(playlist.voiplaylists[voiplaylist].instrumentName) || !this.voiArray.includes(playlist.voiplaylists[voiplaylist].instrumentName2)){
                this.voiArray.push(playlist.voiplaylists[voiplaylist]);
                }
            }
          }



       
          
        }

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

