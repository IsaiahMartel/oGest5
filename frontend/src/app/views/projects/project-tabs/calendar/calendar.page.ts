
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shedule } from 'src/app/models/shedule';
import { SheduleService } from 'src/app/services/shedule/shedule.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  public sheduleArray: Array<Shedule> = [];
  public shedule: Shedule;
  project_id = this.activatedRoute.snapshot.paramMap.get('id');

  constructor(
    private sheduleService: SheduleService,
    private activatedRoute: ActivatedRoute,
    public storage: Storage,
    @Inject(LOCALE_ID) private locale: string,

  ) { }


  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {
    // Pasa los datos desde el local storage de shedule a un array
    this.storage.get("shedule").then(data => {
      if (data) {
        var array = JSON.parse(data);


        array.filter((shedule) => {
     


          if (shedule.project_id == this.project_id) {
         
         

            this.sheduleArray.push(shedule);
            // Ordena el array por fecha
            this.sheduleArray.sort((a,b)=>new Date(a.sheduleDate).getTime()-new Date(b.sheduleDate).getTime());
          };
        })
      } else {

// Si no tiene los datos, los va a buscar
        this.getData();
      }
    })
  }

  // Va a buscar los datos al backend
  getData() {
    this.sheduleService.getShedules().subscribe((p: Array<Shedule>) => {

      this.storage.set("shedule", JSON.stringify(p));
      this.sheduleArray = p;
    })
  }

}