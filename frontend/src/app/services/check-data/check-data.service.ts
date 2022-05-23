import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
<<<<<<< HEAD
import { Address } from 'src/app/models/address';
=======
import { AddressGroup } from 'src/app/models/address-group';
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
import { Playlist } from 'src/app/models/playlist';
import { Project } from 'src/app/models/project';
import { Shedule } from 'src/app/models/shedule';
import { AddressService } from '../address/address.service';
import { PlaylistsService } from '../playlists/playlists.service';
import { ProjectsService } from '../projects/projects.service';
import { SheduleService } from '../shedule/shedule.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CheckDataService {
  private projects: Subject<Project> = new Subject<Project>();
   projectsObs: Observable<Project> = this.projects.asObservable();
  private shedule: Subject<Shedule> = new Subject<Shedule>();
  sheduleObs: Observable<Shedule> = this.shedule.asObservable();
<<<<<<< HEAD
  private address: Subject<Address> = new Subject<Address>();
  addressObs: Observable<Address> = this.address.asObservable();
=======
  private address: Subject<AddressGroup> = new Subject<AddressGroup>();
  addressObs: Observable<AddressGroup> = this.address.asObservable();
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
  private playlist: Subject<Playlist> = new Subject<Playlist>();
  playlistObs: Observable<Playlist> = this.playlist.asObservable();
  
  constructor( private projectsService: ProjectsService,
    private sheduleService: SheduleService,
    private playlistService: PlaylistsService,
    private addressServivce: AddressService,
    private storage: Storage,) { }

checkProjectsLocal(){

  
        this.storage.get("projects").then(data => {
       
          if (data) {
            
            this.getProjectsObs().next(JSON.parse(data));
          }

          else {
            // Si no tiene los datos, los va a buscar
        
            this.getProjects();
          }
        })
      }

      checkSheduleLocal(){
 

        this.storage.get("shedule").then(data => {

          if (data) {
            this.getSheduleObs().next(JSON.parse(data));
          }

          else {
            // Si no tiene los datos, los va a buscar
            this.getShedule();
          }
        })
      }

      checkAddressLocal(){
        this.storage.get("address").then(data => {
          if (data) {
            this.getAddressObs().next(JSON.parse(data))
          
            
          }

          else {
            // Si no tiene los datos, los va a buscar
            this.getAddress();
          }
        })
      }

      checkPlaylistLocal(){
        this.storage.get("playlist").then(data => {

          if (data) {
            this.getPlaylistObs().next(JSON.parse(data))
     
          }
          else {
            // Si no tiene los datos, los va a buscar
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

  getShedule(){
    this.sheduleService.getShedules().subscribe((p: Array<Shedule>) => {
      this.storage.set("shedule", JSON.stringify(p));
      this.checkSheduleLocal();
    })
  }

  getAddress(){
<<<<<<< HEAD
    this.addressServivce.getAddresses().subscribe((p: Array<Address>) => {
=======
    this.addressServivce.getAddresses().subscribe((p: Array<AddressGroup>) => {
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
      this.storage.set("address", JSON.stringify(p));
      this.checkAddressLocal();
    })
  }

  getPlaylist(){
    this.playlistService.getPlaylists().subscribe((p: Array<Playlist>) => {
      this.storage.set("playlist", JSON.stringify(p));
      this.checkPlaylistLocal();
    })
  }

  public getProjectsObs(): Subject<Project> {
    return this.projects;
  }

  public getSheduleObs(): Subject<Shedule> {
    return this.shedule;
  }

<<<<<<< HEAD
  public getAddressObs(): Subject<Address> {
=======
  public getAddressObs(): Subject<AddressGroup> {
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
    return this.address;
  }

  public getPlaylistObs(): Subject<Playlist> {
    return this.playlist;
  }


  
}
