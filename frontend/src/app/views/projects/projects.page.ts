import { AfterViewInit, Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Projects } from '../../models/projects';
import { ProjectsService } from '../../services/projects/projects.service';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { GestureController, MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { EventsOrWorksModal } from './reports/events-or-works-modal/events-or-works-modal.page';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { Echo } from 'laravel-echo-ionic';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements AfterViewInit {
  @ViewChildren('holdBtn', { read: ElementRef }) holdBtnArray: QueryList<ElementRef>;
  hold = 0;
  modalId: number;

  longPressActive = false;
  menuController: MenuController;
  private modalOpen: boolean = false;

  public projectsArray: Array<Projects> = [];
  public projects: Projects;
  projectId: number;

  constructor(
    private projectsService: ProjectsService,
    private pdfService: PdfService,
    private gestureCtrl: GestureController,
    private modalController: ModalController,
    private alertController: AlertController,
    public storage: Storage,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.doConnection();
    });
  }

  ngAfterViewInit() {
    this.loadInfo();
    this.holdBtnArray.changes
      .subscribe(() => this.holdBtnArray.forEach((holdBtn: ElementRef) => {
        if (holdBtn != null) {
          this.projectId = holdBtn.nativeElement.getAttribute("ng-reflect-router-link").split("/").pop()
          const longPress = this.gestureCtrl.create({
            el: holdBtn.nativeElement,
            threshold: 0,
            gestureName: 'long-press',
            onStart: ev => {
              this.longPressActive = true;
              this.increase();
            },
            onEnd: ev => {
              this.longPressActive = false;
            }
          }, true);
          longPress.enable(true);
        }
      })
      );
  }

  doConnection() {
    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'local',
      wsHost: 'localhost',
      wsPort: 6001,
      forceTLS: false,
      disableStats: true
    });

    const channel = echo.channel('channel');
    channel.listen('Alert', (data) => {
      console.log(JSON.stringify(data));
      this.notification(data);
      this.updateData();
    });
  }

  increase(timeout = 200) {
    setTimeout(() => {
      if (this.longPressActive) {
        this.hold++;
        this.increase(timeout);

      }
    }, timeout);
    if (this.hold == 4) {
      this.openModal();
      this.hold = 0;
      this.pdfService.projectId = this.projectId;
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: EventsOrWorksModal,
      handle: false,
      initialBreakpoint: 0.22,
      breakpoints: [0, 0.22],
    });

    modal.onDidDismiss().then((o) => { this.modalOpen = false })

    if (!this.modalOpen) {
      this.modalOpen = true;
      return await modal.present();
    }
  }

  loadInfo() {
    this.storage.get("projects").then(data => {

      if (data) {
          this.projectsArray = JSON.parse(data);
      }

      else {
    
        this.updateData();
      }
     
    })
  }


  updateData() {
    this.projectsService.getProjects().subscribe((p: Array<Projects>) => {

      this.storage.set("projects", JSON.stringify(p));

      this.projectsArray = p.filter((project) => {
        return project.published == true;
      })
    })
  }

  async notification(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Se han realizado cambios',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}