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
    protected http: HttpClient) {  }


  checkProjectsLocal() {
    this.storage.get("projects").then(data => {
      if (data) {
        this.getProjectsObs().next(JSON.parse(data));
      }
      else {
        // Si no tiene los datos, los va a buscar al backend
        this.getProjects();
      }
    })
  }

  checkSheduleLocal() {
    this.storage.get("shedule").then(data => {
      if (data) {
        this.getSheduleObs().next(JSON.parse(data));
      }
      else {
        // Si no tiene los datos, los va a buscar al backend
        this.getShedule();
      }
    })
  }

  checkAddressLocal() {
    this.storage.get("address").then(data => {
      if (data) {
        this.getAddressObs().next(JSON.parse(data))
      }
      else {
        // Si no tiene los datos, los va a buscar al backend
        this.getAddress();
      }
    })
  }

  checkPlaylistLocal() {
    this.storage.get("playlist").then(data => {
      if (data) {
        this.getPlaylistObs().next(JSON.parse(data))
      }
      else {
        // Si no tiene los datos, los va a buscar al backend
        this.getPlaylist();
      }
    })
  }

  getProjects() {
    this.projectsService.getProjects().subscribe((p: Array<Project>) => {
      this.storage.set("projects", JSON.stringify(p));
      this.checkProjectsLocal();
    })
  }

  getShedule() {
    this.sheduleService.getShedules().subscribe((p: Array<Shedule>) => {
      this.storage.set("shedule", JSON.stringify(p));
      this.checkSheduleLocal();
    })
  }

  getAddress() {
    this.addressServivce.getAddresses().subscribe((p: Array<Address>) => {
      this.storage.set("address", JSON.stringify(p));
      this.checkAddressLocal();
    })
  }

  getPlaylist() {
    this.playlistService.getPlaylists().subscribe((p: Array<Playlist>) => {
      this.storage.set("playlist", JSON.stringify(p));
      this.checkPlaylistLocal();
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
    this.storage.get("project1").then(data => {
      document.body.style.setProperty('--project1', data);
    })

    this.storage.get("project2").then(data => {
      document.body.style.setProperty('--project2', data);
    })

    this.storage.get("project3").then(data => {
      document.body.style.setProperty('--project3', data);
    })
    this.storage.get("project4").then(data => {
      document.body.style.setProperty('--project4', data);
    })

    this.storage.get("importantProject1").then(data => {
      document.body.style.setProperty('--importantProject1', data);
    })

    this.storage.get("importantProject2").then(data => {
      document.body.style.setProperty('--importantProject2', data);
    })
    this.storage.get("importantProject3").then(data => {
      document.body.style.setProperty('--importantProject3', data);
    })
    this.storage.get("importantProject4").then(data => {
      document.body.style.setProperty('--importantProject4', data);
    })
    this.storage.get("freeDay").then(data => {
      document.body.style.setProperty('--freeDay', data);
    })
  }

}
