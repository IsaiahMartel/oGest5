
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { Storage } from '@ionic/storage';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';


@Component({
  selector: 'app-works',
  templateUrl: './works.page.html',
  styleUrls: ['./works.page.scss'],
})

export class WorksPage implements OnInit {
  public playlistArray: Array<Playlist> = [];
  public playlist: Playlist;
  projectId: number; 

  constructor(
    private playlistService: PlaylistsService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    public storage: Storage, 
    private checkDataService : CheckDataService,
    private projectIdService: ProjectIdService
  ) { }

  ngOnInit(): void {
    this.loadInfo();
  }
  
   // Pasa los datos desde el local storage de playlist a un array
  loadInfo() {
    this.projectId = this.projectIdService.projectId;
    this.checkDataService.checkPlaylistLocal();
    this.checkDataService.playlistObs.subscribe((playlist) => {
     
      var array: Array<Playlist> = Object.values(playlist);
      array.filter((playlist) => {
        if (playlist.project_id == this.projectId) {
          this.playlistArray.push(playlist);

          // Ordena el array por playlistOrder
          this.playlistArray.sort((a, b) => a.playlistOrder - b.playlistOrder);

        };
    })
  })

    this.storage.get("playlist").then(data => {
      if (data) {
        var array = JSON.parse(data);
        
        array.filter((playlist) => {
          if (playlist.project_id == this.projectId) {
            this.playlistArray.push(playlist);

            // Ordena el array por playlistOrder
            this.playlistArray.sort((a, b) => a.playlistOrder - b.playlistOrder);

          };
        })


      } 
    })
  }





}





