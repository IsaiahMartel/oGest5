import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/models/address';
import { Playlist } from 'src/app/models/playlist';
import { Project } from 'src/app/models/project';
import { Shedule } from 'src/app/models/shedule';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';
import { ProjectsService } from 'src/app/services/projects/projects.service';

export const sheduleArray: Array<Shedule> = [];
export const perArray: Array<Playlist> = [];
export const keyArray: Array<Playlist> = [];
export const voiArray: Array<Playlist> = [];
export const addressArray: Array<Address> = [];
export const projectMembersArray: Array<Project> = [];
export const playlistArray: Array<Playlist> = [];
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})

export class TabsPage {
  public urlSplitArray: string[] = [];
  public id: number;
  public projectName: String;
  public projectId;
  subscription = new Subscription();
  subscription2 = new Subscription();
  subscription3 = new Subscription();
  subscription4 = new Subscription();
  subscription5 = new Subscription();
  subscription6 = new Subscription();
  subscription7 = new Subscription();
  subscription8 = new Subscription();

  calendarButton;
  membersButton;
  worksButton;
  instrumentsButton;
  sheduleArray: Array<Shedule> = [];
  playlistArray: Array<Playlist> = [];
  addressArray: Array<Address> = [];

  perArray = [];
  keyArray = [];
  voiArray = [];
  public noPercussion = true;
  public noVoice = true;
  public noKeyboard = true;
  projectMembersArray: Array<Project> = [];


  constructor(
    private router: Router,
    public storage: Storage,
    private projectIdService: ProjectIdService,
    private checkDataService: CheckDataService,
  ) {
    this.projectIdService;

  }
  ionViewDidEnter(){
  
 
 // Por si se recarga la página desde un proyecto
 this.urlSplitArray = this.router.url.split("/");
 this.projectId = parseInt(this.urlSplitArray.slice(-1)[0]);
 this.projectIdService.getInterceptedSource().next(this.projectId);

    this.checkDataService.checkProjectsLocal();

    this.subscription2 = this.checkDataService.projectsObs.subscribe((projects) => {
      var array: Array<Project> = Object.values(projects);
      array.filter((project) => {
        if (project.id == this.projectId) {
          this.projectName = project.events.eventName;


        }
      })
    })

    this.loadShedule();
    this.loadPlaylistAndInstruments();


    this.loadMembers();

    this.currentTabSelectedWhenLoad();
  }

  ngAfterViewInit() {









  }

  loadShedule() {

    this.checkDataService.checkSheduleLocal();
    this.subscription4 = (this.checkDataService.sheduleObs.subscribe((shedule) => {



      document.body.style.setProperty('--visibilitySpinner', "visible");
      var array = Object.values(shedule);
      sheduleArray.length = 0;
      this.sheduleArray = [];

      array.filter((shedule) => {

        if (shedule.project_id == this.projectId) {
        shedule.sheduleNote=   shedule.sheduleNote.replace(/<\/?[^>]+(>|$)/g, "");

          sheduleArray.push(shedule);
          this.sheduleArray.push(shedule);

          // Ordena el array por fecha
          this.sheduleArray.sort((a, b) => new Date(a.sheduleDate).getTime() - new Date(b.sheduleDate).getTime());
          sheduleArray.sort((a, b) => new Date(a.sheduleDate).getTime() - new Date(b.sheduleDate).getTime());


        }
      })
      document.body.style.setProperty('--visibilityBodyTabs', "visible");
      document.body.style.setProperty('--visibilitySpinner', "hidden");

    }))
  }

  loadMembers() {
    this.checkDataService.checkAddressLocal();
    this.subscription6 = this.checkDataService.addressObs.subscribe((project) => {
      document.body.style.setProperty('--visibilitySpinner', "visible");
      this.addressArray = [];
      addressArray.length = 0;
      projectMembersArray.length = 0;
      this.projectMembersArray = [];

      var array: Array<Project> = Object.values(project);
      array.filter((project) => {

        if (project.id == this.projectId) {

          this.projectMembersArray.push(project);
          projectMembersArray.push(project)

          for (let p of this.projectMembersArray) {

            for (let address in p.addresses) {

              this.addressArray.push(p.addresses[address]);
              addressArray.push(p.addresses[address])

            }
          }
        };
      })
      document.body.style.setProperty('--visibilityBodyTabs', "visible");
      document.body.style.setProperty('--visibilitySpinner', "hidden");

    })
  }

 
  loadPlaylistAndInstruments() {


    this.checkDataService.checkPlaylistLocal();
    this.subscription5 = this.checkDataService.playlistObs.subscribe((playlist) => {
      document.body.style.setProperty('--visibilitySpinner', "visible");
      this.keyArray = [];
      this.voiArray = []; this.perArray = [];
      keyArray.length = 0;
      voiArray.length = 0;
      perArray.length = 0;

      var array: Array<Playlist> = Object.values(playlist);
      array.filter((playlist) => {

 
        
        
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
        playlistArray.push(playlist);

        // Ordena el array por playlistOrder
        this.playlistArray.sort((a, b) => a.playlistOrder - b.playlistOrder);
      
      playlistArray.sort((a, b) => a.playlistOrder - b.playlistOrder);


     
        if (playlist.perplaylists != null || playlist.voiplaylists != null || playlist.keyplaylists != null) {
          var playlistArrayWithAll = []
          playlistArrayWithAll.push(playlist);


        }


        //  Comprueba si hay instrumentos en cada categoría, los mete en un array de su categoría y descarta los duplicados
        playlistArrayWithAll.filter((instruments) => {
          for (let index in instruments.perplaylists) {
            if (instruments.perplaylists[index].instrumentName != null || playlist.perplaylists[index].instrumentName2 != null) {
              this.noPercussion = false;;
              if (!this.perArray.some(instrument => instrument.instrumentName == instruments.perplaylists[index].instrumentName)) {


                this.perArray.push(instruments.perplaylists[index]);
                perArray.push(instruments.perplaylists[index]);
              }
            }
          }

          for (let index in instruments.keyplaylists) {
            if (instruments.keyplaylists[index].instrumentName != null || playlist.keyplaylists[index].instrumentName2 != null) {
              this.noKeyboard = false;

              if (!this.keyArray.some(instrument => instrument.instrumentName == instruments.keyplaylists[index].instrumentName)) {

                this.keyArray.push(instruments.keyplaylists[index]);
                keyArray.push(instruments.keyplaylists[index]);
              }
            }
          }

          for (let index in instruments.voiplaylists) {
            if (instruments.voiplaylists[index].instrumentName != null || playlist.voiplaylists[index].instrumentName2 != null) {
              this.noVoice = false;;
              if (!this.keyArray.some(instrument => instrument.instrumentName == instruments.voiplaylists[index].instrumentName)) {

                this.voiArray.push(instruments.voiplaylists[index]);
                voiArray.push(instruments.voiplaylists[index]);
              }
            }
          }
        })
      }
    })
    document.body.style.setProperty('--visibilityBodyTabs', "visible");
    document.body.style.setProperty('--visibilitySpinner', "hidden");

  })
}

currentTabSelectedWhenLoad(){



  this.calendarButton = document.getElementsByTagName("ion-tab-button")[0]
  this.membersButton = document.getElementsByTagName("ion-tab-button")[1]
  this.worksButton = document.getElementsByTagName("ion-tab-button")[2]
  this.instrumentsButton =document.getElementsByTagName("ion-tab-button")[3]

  if (this.urlSplitArray[2] == "calendar") {
  
    this.calendarButton
      .classList.add("tab-selected")
    this.membersButton
      .classList.remove("tab-selected")
    this.worksButton
      .classList.remove("tab-selected")
    this.instrumentsButton
      .classList.remove("tab-selected")
  } else if (this.urlSplitArray[2] == "members") {
    this.membersButton
      .classList.add("tab-selected")
    this.worksButton
      .classList.remove("tab-selected")
    this.instrumentsButton
      .classList.remove("tab-selected")
    this.calendarButton
      .classList.remove("tab-selected")

  } else if (this.urlSplitArray[2] == "works") {
    this.worksButton
      .classList.add("tab-selected")
    this.instrumentsButton
      .classList.remove("tab-selected")
    this.calendarButton
      .classList.remove("tab-selected")
    this.membersButton
      .classList.remove("tab-selected")

  } else if (this.urlSplitArray[2] == "instruments") {



    this.instrumentsButton
      .classList.add("tab-selected")
    this.calendarButton
      .classList.remove("tab-selected")
    this.membersButton
      .classList.remove("tab-selected")
    this.worksButton
      .classList.remove("tab-selected")
  }

}




selected(element) {
  if (element == 1) {
    this.calendarButton
      .classList.add("tab-selected")
    this.membersButton
      .classList.remove("tab-selected")
    this.worksButton
      .classList.remove("tab-selected")
    this.instrumentsButton
      .classList.remove("tab-selected")
  } else if (element == 2) {
    this.membersButton
      .classList.add("tab-selected")
    this.worksButton
      .classList.remove("tab-selected")
    this.instrumentsButton
      .classList.remove("tab-selected")
    this.calendarButton
      .classList.remove("tab-selected")

  } else if (element == 3) {
    this.worksButton
      .classList.add("tab-selected")
    this.instrumentsButton
      .classList.remove("tab-selected")
    this.calendarButton
      .classList.remove("tab-selected")
    this.membersButton
      .classList.remove("tab-selected")

  } else if (element == 4) {

    this.instrumentsButton
      .classList.add("tab-selected")
    this.calendarButton
      .classList.remove("tab-selected")
    this.membersButton
      .classList.remove("tab-selected")
    this.worksButton
      .classList.remove("tab-selected")
  }

}

ionViewDidLeave() {
  this.subscription.unsubscribe();
  this.subscription2.unsubscribe();
  this.subscription3.unsubscribe();
  this.subscription4.unsubscribe();
  this.subscription5.unsubscribe();
  this.subscription6.unsubscribe();
  this.subscription7.unsubscribe();
  document.body.style.setProperty('--visibilitySpinner', "visible");
  document.body.style.setProperty('--visibilityBodyTabs', "hidden");

}

}