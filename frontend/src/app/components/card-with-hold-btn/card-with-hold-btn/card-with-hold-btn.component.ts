import { AfterViewInit, Component, ElementRef, ViewChild, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { GestureController, MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-card-with-hold-btn',
  templateUrl: './card-with-hold-btn.component.html',
  styleUrls: ['./card-with-hold-btn.component.scss'],
})
export class CardWithHoldBtnComponent implements OnInit {
  @ViewChildren('holdBtn', { read: ElementRef }) holdBtnArray: QueryList<ElementRef>;
  hold = 0;
  longPressActive = false;
  menuController: MenuController;
  private modalOpen: boolean = false;
private cardTitle : string = ""
private cardSubtitle : string = ""
private cardContent : string = ""


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private pdfService: PdfService, private gestureCtrl: GestureController, private modalController: ModalController) { }

  ngOnInit(): void {


  }

  async ngAfterViewInit() {

    this.holdBtnArray.changes
      .subscribe(() => this.holdBtnArray.forEach((holdBtn: ElementRef) => {
        if (holdBtn != null) {
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

  increase(timeout = 200) {
    setTimeout(() => {
      if (this.longPressActive) {
        this.hold++;

        this.increase(timeout);

      }
    }, timeout);

  }



}
