
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { Storage } from '@ionic/storage';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';
import { Subscription } from 'rxjs';
import { playlistArray, } from '../tabs.page';


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

    this.playlistArray=playlistArray;

  }


}





