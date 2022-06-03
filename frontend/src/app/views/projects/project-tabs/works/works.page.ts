
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { Storage } from '@ionic/storage';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-works',
  templateUrl: './works.page.html',
  styleUrls: ['./works.page.scss'],
})

export class WorksPage implements OnInit {
  public playlistArray: Array<Playlist> = [];
  public playlist: Playlist;
  projectId: number;
  subscription = new Subscription();

  constructor(
    private playlistService: PlaylistsService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    public storage: Storage,
    private checkDataService: CheckDataService,
    private projectIdService: ProjectIdService
  ) { }

  ngOnInit(): void {
    this.loadInfo();
  }

  // Pasa los datos desde el local storage de playlist a un array
  loadInfo() {
    this.projectId = this.projectIdService.projectId;
    this.checkDataService.checkPlaylistLocal();
    this.subscription.add(this.checkDataService.playlistObs.subscribe((playlist) => {

      var array: Array<Playlist> = Object.values(playlist);
      array.filter((playlist) => {

        // Todos estos if's se encargan de convertir campos con solo espacios en blanco en nulos (para que pasen por el filtro del html)
        if (playlist.project_id == this.projectId) {
          if (playlist.fluteExp != null && playlist.fluteExp != "") {
            if (playlist.fluteExp.trim().length == 0) {
              playlist.fluteExp = null;
            };
          }
          if (playlist.oboeExp != null && playlist.oboeExp != "") { if (playlist.oboeExp.trim().length == 0) { playlist.oboeExp = null } }
          if (playlist.clarinetExp != null && playlist.clarinetExp != "") { if (playlist.clarinetExp.trim().length == 0) { playlist.clarinetExp = null } }
          if (playlist.bassoonExp != null && playlist.bassoonExp != "") { if (playlist.bassoonExp.trim().length == 0) { playlist.bassoonExp = null } }
          if (playlist.hornExp != null && playlist.hornExp != "") { if (playlist.hornExp.trim().length == 0) { playlist.hornExp = null } }
          if (playlist.trumpetExp != null && playlist.trumpetExp != "") { if (playlist.trumpetExp.trim().length == 0) { playlist.trumpetExp = null } }
          if (playlist.tromboneExp != null && playlist.tromboneExp != "") { if (playlist.tromboneExp.trim().length == 0) { playlist.tromboneExp = null } }
          if (playlist.tubaExp != null && playlist.tubaExp != "") { if (playlist.tubaExp.trim().length == 0) { playlist.tubaExp = null } }
          if (playlist.harpExp != null && playlist.harpExp != "0") { if (playlist.harpExp.trim().length == 0) { playlist.harpExp = null } }
          if (playlist.keyboardExp != null && playlist.keyboardExp != "0") { if (playlist.keyboardExp.trim().length == 0) { playlist.keyboardExp = null } }
          if (playlist.extraExp != null && playlist.extraExp != "0") { if (playlist.extraExp.trim().length == 0) { playlist.extraExp = null } }

          this.playlistArray.push(playlist);

          // Ordena el array por playlistOrder
          this.playlistArray.sort((a, b) => a.playlistOrder - b.playlistOrder);
        };
      })
    }))
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }
}





