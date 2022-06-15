import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Playlist } from 'src/app/models/playlist';

import { Storage } from '@ionic/storage';

import { PlaylistsService } from 'src/app/services/playlists/playlists.service';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';
import { Subscription } from 'rxjs';
import { keyArray } from '../tabs.page';
import { voiArray } from '../tabs.page';
import { perArray } from '../tabs.page';


@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.page.html',
  styleUrls: ['./instruments.page.scss'],
})
export class InstrumentsPage implements OnInit {
  public playlistArray: Array<Playlist> = [];
  public playlist: Playlist;
  projectId: number;

  // Booleans para los botones de abrir y cerrar
  public showPercussion = false;
  public showVoice = false;
  public showKeyboard = false;

  // Booleans para saber si no hay instrumentos que mostrar de una categoría
  public noPercussion = true;
  public noVoice = true;
  public noKeyboard = true;

  perArray = [];
  keyArray = [];
  voiArray = [];
  subscription = new Subscription();

  constructor(
    private playlistService: PlaylistsService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    public storage: Storage, private checkDataService: CheckDataService,
    private projectIdService: ProjectIdService
  ) { }

  ngOnInit(): void {
  
  }

  ionViewDidEnter(){
    this.perArray= perArray;
    this.keyArray = keyArray;
    this.voiArray= voiArray;
 
    
if(this.perArray.length>0){
  this.noPercussion=false
}

if(this.keyArray.length>0){
  this.noKeyboard=false
}
if(this.voiArray.length>0){
  this.noVoice=false
}
  }


}

