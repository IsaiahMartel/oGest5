
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shedule } from 'src/app/models/shedule';
import { SheduleService } from 'src/app/services/shedule/shedule.service';
import { Storage } from '@ionic/storage';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';
import { ProjectIdService } from 'src/app/services/project-id/project-id.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  public sheduleArray: Array<Shedule> = [];
  public shedule: Shedule;
  projectId: number;
  constructor(
    private sheduleService: SheduleService,
    private activatedRoute: ActivatedRoute,
    public storage: Storage,
    @Inject(LOCALE_ID) private locale: string,
    private checkDataService: CheckDataService,
    private projectIdService: ProjectIdService

  ) { }


  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {
    this.projectId = this.projectIdService.projectId;
    // Pasa los datos desde el local storage de shedule a un array
    this.checkDataService.checkSheduleLocal();
    this.checkDataService.sheduleObs.subscribe((shedule) => {
      var array = Object.values(shedule);

      array.filter((shedule) => {
        if (shedule.project_id == this.projectId) {
          this.sheduleArray.push(shedule);

          // Ordena el array por fecha
          this.sheduleArray.sort((a, b) => new Date(a.sheduleDate).getTime() - new Date(b.sheduleDate).getTime());
        };
      })

    })
  }
}