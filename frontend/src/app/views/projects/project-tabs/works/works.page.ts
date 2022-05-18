
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-works',
  templateUrl: './works.page.html',
  styleUrls: ['./works.page.scss'],
})

export class WorksPage implements OnInit {
  public playlistArray: Array<Playlist> = [];
  public playlist: Playlist;
  project_id = this.activatedRoute.snapshot.paramMap.get('id');

  constructor(
    private playlistService: PlaylistsService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    public storage: Storage
  ) { }

  ngOnInit(): void {
    this.loadInfo();
  }
  
   // Pasa los datos desde el local storage de playlist a un array
  loadInfo() {

    this.storage.get("playlist").then(data => {
      if (data) {
        var array = JSON.parse(data);
        
        array.filter((playlist) => {
          if (playlist.project_id == this.project_id) {
            this.playlistArray.push(playlist);

            // Ordena el array por playlistOrder
            this.playlistArray.sort((a, b) => a.playlistOrder - b.playlistOrder);

          };
        })


      } else {
        this.getData();
      }
    })
  }


  getData() {
    this.playlistService.getPlaylists().subscribe((p: Array<Playlist>) => {

      this.storage.set("playlist", JSON.stringify(p));
      this.playlistArray = p;
    })

  }


}





