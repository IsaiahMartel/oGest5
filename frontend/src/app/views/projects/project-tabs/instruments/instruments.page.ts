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
    // this.loadInfo();

//     this.perArray= perArray;
//     this.keyArray = keyArray;
//     this.voiArray= voiArray;
//     console.log(this.perArray.length);
    
// if(this.perArray.length>0){
//   this.noPercussion=false
// }

// if(this.keyArray.length>0){
//   this.noKeyboard=false
// }
// if(this.voiArray.length>0){
//   this.noVoice=false
// }
// console.log(this.noPercussion);

//     console.log(this.perArray);
    
  }

  ionViewDidEnter(){
    this.perArray= perArray;
    this.keyArray = keyArray;
    this.voiArray= voiArray;
    console.log(this.perArray.length);
    
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

  loadInfo() {

    this.projectId = this.projectIdService.projectId;
    this.checkDataService.checkPlaylistLocal();
    this.subscription.add(this.checkDataService.playlistObs.subscribe((playlist) => {
      var array: Array<Playlist> = Object.values(playlist);
      array.filter((playlist) => {
        if (playlist.project_id == this.projectId) {
          if (playlist.perplaylists != null || playlist.voiplaylists != null || playlist.keyplaylists != null) {
            this.playlistArray.push(playlist);

          }
        };
      })

      //  Comprueba si hay instrumentos en cada categoría, los mete en un array de su categoría y descarta los duplicados
      this.playlistArray.filter((instruments) => {
        for (let index in instruments.perplaylists) {
          if (instruments.perplaylists[index].instrumentName != null || playlist.perplaylists[index].instrumentName2 != null) {
            this.noPercussion = false;;
            if (!this.perArray.some(instrument => instrument.instrumentName == instruments.perplaylists[index].instrumentName)) {
              this.perArray.push(instruments.perplaylists[index]);
              perArray.push(instruments.perplaylists[index]);
              console.log(this.perArray);
              
            }
          }
        }

        for (let index in instruments.keyplaylists) {
          if (instruments.keyplaylists[index].instrumentName != null || playlist.keyplaylists[index].instrumentName2 != null) {
            this.noKeyboard = false;;
            if (!this.keyArray.some(instrument => instrument.instrumentName == instruments.keyplaylists[index].instrumentName)) {
              this.keyArray.push(instruments.keyplaylists[index]);
              keyArray.push(instruments.keyplaylists[index]);
              console.log(this.keyArray);
              
            }
          }
        }

        for (let index in instruments.voiplaylists) {
          if (instruments.voiplaylists[index].instrumentName != null || playlist.voiplaylists[index].instrumentName2 != null) {
            this.noVoice = false;;
            if (!this.keyArray.some(instrument => instrument.instrumentName == instruments.voiplaylists[index].instrumentName)) {
              this.voiArray.push(instruments.voiplaylists[index]);
              voiArray.push(instruments.voiplaylists[index]);
              console.log(this.voiArray);
              
            }
          }
        }
      })
    }))
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }
}

