import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Address } from 'src/app/models/address';
import { Playlist } from 'src/app/models/playlist';
import { Project } from 'src/app/models/project';
import { Shedule } from 'src/app/models/shedule';
import { AddressService } from '../address/address.service';
import { PlaylistsService } from '../playlists/playlists.service';
import { ProjectsService } from '../projects/projects.service';
import { SheduleService } from '../shedule/shedule.service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import Localbase from 'localbase';
let db = new Localbase('db');
db.config.debug = false

@Injectable({
  providedIn: 'root'
})
export class CheckDataService {
  private projects: Subject<Project> = new Subject<Project>();
  projectsObs: Observable<Project> = this.projects.asObservable();
  private shedule: Subject<Shedule> = new Subject<Shedule>();
  sheduleObs: Observable<Shedule> = this.shedule.asObservable();
  private address: Subject<Address> = new Subject<Address>();
  addressObs: Observable<Address> = this.address.asObservable();
  private playlist: Subject<Playlist> = new Subject<Playlist>();
  playlistObs: Observable<Playlist> = this.playlist.asObservable();

  constructor(private projectsService: ProjectsService,
    private sheduleService: SheduleService,
    private playlistService: PlaylistsService,
    private addressServivce: AddressService,
    private storage: Storage,
    protected http: HttpClient) { }


  checkProjectsLocal() {
    db.collection('projects').get().then(data => {
      if (Object.keys(data).length > 0) {
        this.getProjectsObs().next(data);
      }
      else {
        // Si no tiene los datos, los va a buscar al backend
        this.getProjects();
      }
    })
  }

  checkSheduleLocal() {
    db.collection('shedule').get().then(data => {
      if (Object.keys(data).length > 0) {
        this.getSheduleObs().next(data);
      }
      else {
        // Si no tiene los datos, los va a buscar al backend
        this.getShedule();
      }
    })
  }

  checkAddressLocal() {
    db.collection('address').get().then(data => {
      if (Object.keys(data).length > 0) {
        this.getAddressObs().next(data);
      }
      else {
        // Si no tiene los datos, los va a buscar al backend
        this.getAddress();
      }
    })
  }

  checkPlaylistLocal() {
    db.collection('playlist').get().then(data => {
      if (Object.keys(data).length > 0) {
        this.getPlaylistObs().next(data);
      }
      else {
        // Si no tiene los datos, los va a buscar al backend
        this.getPlaylist();
      }
    })
  }

  getProjects() {
    this.projectsService.getProjects().subscribe((p: Array<Project>) => {
      db.collection('projects')
      
      .set(Object.values(p)).then(response => {
        this.checkProjectsLocal();
      })
    })
  }

  getShedule() {
    this.sheduleService.getShedules().subscribe((p: Array<Shedule>) => {
 
      db.collection('shedule')
      
      .set(Object.values(p)).then(response => {
        this.checkSheduleLocal();
      })
 
    })
  }

  getAddress() {
    this.addressServivce.getAddresses().subscribe((p: Array<Address>) => {

      db.collection('address')
      
      .set(Object.values(p)).then(response => {
        this.checkAddressLocal();
      })
    })
  }

  getPlaylist() {
    this.playlistService.getPlaylists().subscribe((p: Array<Playlist>) => {
      db.collection('playlist')
      
      .set(Object.values(p)).then(response => {
        this.checkPlaylistLocal();
      })
    })
  }


  // Observables para subscribir dentro de las views
  public getProjectsObs(): Subject<Project> {
    return this.projects;
  }

  public getSheduleObs(): Subject<Shedule> {
    return this.shedule;
  }

  public getAddressObs(): Subject<Address> {
    return this.address;
  }

  public getPlaylistObs(): Subject<Playlist> {
    return this.playlist;
  }

  setTheme() {
    this.storage.get("firstProject").then(data => {
      document.body.style.setProperty('--firstProject', data);
    })

    this.storage.get("secondProject").then(data => {
      document.body.style.setProperty('--secondProject', data);
    })

    this.storage.get("thirdProject").then(data => {
      document.body.style.setProperty('--thirdProject', data);
    })
    this.storage.get("fourthProject").then(data => {
      document.body.style.setProperty('--fourthProject', data);
    })

    this.storage.get("firstProjectImportant").then(data => {
      document.body.style.setProperty('--firstProjectImportant', data);
    })

    this.storage.get("secondProjectImportant").then(data => {
      document.body.style.setProperty('--secondProjectImportant', data);
    })
    this.storage.get("thirdProjectImportant").then(data => {
      document.body.style.setProperty('--thirdProjectImportant', data);
    })
    this.storage.get("fourthProjectImportant").then(data => {
      document.body.style.setProperty('--fourthProjectImportant', data);
    })
    this.storage.get("freeDay").then(data => {
      document.body.style.setProperty('--freeDay', data);
    })
  }

}
