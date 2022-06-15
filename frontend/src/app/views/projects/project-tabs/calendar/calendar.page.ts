
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shedule } from 'src/app/models/shedule';
import { SheduleService } from 'src/app/services/shedule/shedule.service';
import { Storage } from '@ionic/storage';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';
import { Subscription } from 'rxjs';
import {sheduleArray} from '../tabs.page';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  public sheduleArray: Array<Shedule> = [];
  public shedule: Shedule;
  projectId: number;
  subscription = new Subscription();


  constructor(
    public storage: Storage,
    @Inject(LOCALE_ID) private locale: string,
    private checkDataService: CheckDataService,
    private projectIdService: ProjectIdService

  ) { }

    // Instanciamos los elementos que vamos a usar una vez cargada la página



  ngOnInit(): void {
 
    this.sheduleArray=sheduleArray;
  }

  
}