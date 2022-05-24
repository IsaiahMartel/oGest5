import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})



export class ConfigurationPage implements OnInit {

  public color1: string = (getComputedStyle(document.body).getPropertyValue('--project1'));
  public color2: string = (getComputedStyle(document.body).getPropertyValue('--project2'));
  public color3: string = (getComputedStyle(document.body).getPropertyValue('--project3'));
  public color4: string = (getComputedStyle(document.body).getPropertyValue('--project4'));
  importantProject1 = getComputedStyle(document.body).getPropertyValue('--importantProject1');
  importantProject2 = getComputedStyle(document.body).getPropertyValue('--importantProject2');
  importantProject3 = getComputedStyle(document.body).getPropertyValue('--importantProject3');
  importantProject4 = getComputedStyle(document.body).getPropertyValue('--importantProject4');

  constructor(private storage: Storage, private checkDataService: CheckDataService) { }

  ngOnInit() {



  }


  colorPickerChange1(event) {


    document.body.style.setProperty('--project1', event);

    document.body.style.setProperty('--importantProject1', this.adjust(this.color1.trim(), -50))

    //  this.color1 = (getComputedStyle(document.body).getPropertyValue('--project1'));




    this.storage.set("project1", this.color1);
    this.storage.set("importantProject1", this.importantProject1);

  }


  colorPickerChange2(event) {
    document.body.style.setProperty('--project2', event);
    this.color2 = (getComputedStyle(document.body).getPropertyValue('--project2'));
    document.body.style.setProperty('--importantProject2', this.adjust(this.color2.trim(), -50))



    this.storage.set("project2", this.color2);
    this.storage.set("importantProject2", this.importantProject2);




  }

  colorPickerChange3(event) {
    document.body.style.setProperty('--project3', event);
    this.color3 = (getComputedStyle(document.body).getPropertyValue('--project3'));

    document.body.style.setProperty('--importantProject3', this.adjust(this.color3.trim(), -50))



    this.storage.set("project3", this.color3);
    this.storage.set("importantProject3", this.importantProject3);

  }

  colorPickerChange4(event) {
    document.body.style.setProperty('--project4', event);
    this.color4 = (getComputedStyle(document.body).getPropertyValue('--project4'));

    document.body.style.setProperty('--importantProject4', this.adjust(this.color4.trim(), -50))



    this.storage.set("project4", this.color4);
    this.storage.set("importantProject4", this.importantProject4);

  }

  colorPickerCancel1() {
    this.color1 = (getComputedStyle(document.body).getPropertyValue('--projectDefault1'));
    document.body.style.setProperty('--project1', this.color1);
    this.storage.set("project1", this.color1);
  this.importantProject1 = getComputedStyle(document.body).getPropertyValue('--importantDefaultProject1')
    this.storage.set("importantProject1", this.importantProject1);
    document.body.style.setProperty('--importantProject1', this.importantProject1);

  }
  colorPickerCancel2() {

    this.color2 = (getComputedStyle(document.body).getPropertyValue('--projectDefault2'));
    document.body.style.setProperty('--project2', this.color2);
    this.storage.set("project2", this.color2);
     this.importantProject2 = getComputedStyle(document.body).getPropertyValue('--importantProjectDefault2')

    document.body.style.setProperty('--importantProject2', this.importantProject2);
    this.storage.set("importantProject2", this.importantProject2);
  }

  colorPickerCancel3() {

    this.color3 = (getComputedStyle(document.body).getPropertyValue('--projectDefault3'));
    document.body.style.setProperty('--project3', this.color3);
    this.storage.set("project3", this.color3);
    this.importantProject3 = getComputedStyle(document.body).getPropertyValue('--importantDefaultProject3')
    this.storage.set("importantProject3", this.importantProject3);
    document.body.style.setProperty('--importantProject3', this.importantProject3);
  }

  colorPickerCancel4() {
    this.color4 = (getComputedStyle(document.body).getPropertyValue('--projectDefault4'));
    document.body.style.setProperty('--project4', this.color4);
    this.storage.set("project4", this.color4);
    this.importantProject4 = getComputedStyle(document.body).getPropertyValue('--importantDefaultProject4')
    this.storage.set("importantProject4", this.importantProject4);
    document.body.style.setProperty('--importantProject4', this.importantProject4);

  }



  adjust(color, percent) {

    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = Math.floor(R * (100 + percent) / 100);
    G = Math.floor(G * (100 + percent) / 100);
    B = Math.floor(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
  }


}
