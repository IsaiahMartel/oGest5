import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CheckDataService } from 'src/app/services/check-data/check-data.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.page.html',
  styleUrls: ['./themes.page.scss'],
})



export class ThemesPage implements OnInit {

  public firstColor: string = (getComputedStyle(document.body).getPropertyValue('--firstProject'));
  public secondColor: string = (getComputedStyle(document.body).getPropertyValue('--secondProject'));
  public thirdColor: string = (getComputedStyle(document.body).getPropertyValue('--thirdProject'));
  public fourthColor: string = (getComputedStyle(document.body).getPropertyValue('--fourthProject'));
  public freeDayColor: string = (getComputedStyle(document.body).getPropertyValue('--freeDay'));

  firstImportantColor = getComputedStyle(document.body).getPropertyValue('--firstProjectImportant');
  secondImportantColor = getComputedStyle(document.body).getPropertyValue('--secondProjectImportant');
  thirdImportantColor = getComputedStyle(document.body).getPropertyValue('--thirdProjectImportant');
  fourthImportantColor = getComputedStyle(document.body).getPropertyValue('--fourthProjectImportant');

  constructor(private storage: Storage, private checkDataService: CheckDataService) { }

  ngOnInit() {

 

  }


  firstColorPicker(event) {


    document.body.style.setProperty('--firstProject', event);

    document.body.style.setProperty('--firstProjectImportant', this.adjust(this.firstColor.trim(), -30))

     this.firstColor = (getComputedStyle(document.body).getPropertyValue('--firstProject'));
     this.firstImportantColor = (getComputedStyle(document.body).getPropertyValue('--firstProjectImportant'));

     console.log(this.firstImportantColor);

    this.storage.set("firstProject", this.firstColor);
    this.storage.set("firstProjectImportant", this.firstImportantColor);
    console.log(this.firstImportantColor);
  }


  secondColorPicker(event) {
    document.body.style.setProperty('--secondProject', event);

    document.body.style.setProperty('--secondProjectImportant', this.adjust(this.secondColor.trim(), -30))

     this.secondColor = (getComputedStyle(document.body).getPropertyValue('--secondProject'));
     this.secondImportantColor = (getComputedStyle(document.body).getPropertyValue('--secondProjectImportant'));

     console.log(this.secondImportantColor);

    this.storage.set("secondProject", this.secondColor);
    this.storage.set("secondProjectImportant", this.secondImportantColor);

    console.log(this.secondImportantColor);
  }

  thirdColorPicker(event) {
    document.body.style.setProperty('--thirdProject', event);
    this.thirdColor = (getComputedStyle(document.body).getPropertyValue('--thirdProject'));

    document.body.style.setProperty('--thirdProjectImportant', this.adjust(this.thirdColor.trim(), -30))


    this.thirdImportantColor = (getComputedStyle(document.body).getPropertyValue('--thirdProjectImportant'));
    console.log(this.thirdImportantColor);

    console.log(this.thirdImportantColor);
    
    this.storage.set("thirdProject", this.thirdColor);
    this.storage.set("thirdProjectImportant", this.thirdImportantColor);

  }

  fourthColorPicker(event) {
    document.body.style.setProperty('--fourthProject', event);
    this.fourthColor = (getComputedStyle(document.body).getPropertyValue('--fourthProject'));

    document.body.style.setProperty('--fourthProjectImportant', this.adjust(this.fourthColor.trim(), -30))
    this.fourthImportantColor = (getComputedStyle(document.body).getPropertyValue('--thirdProjectImportant'));
    console.log(this.fourthImportantColor);

    this.storage.set("fourthProject", this.fourthColor);
    this.storage.set("fourthProjectImportant", this.fourthImportantColor);
    console.log(this.fourthImportantColor);
  }

  colorPickerChange5(event) {
    document.body.style.setProperty('--freeDay', event);
    this.freeDayColor = (getComputedStyle(document.body).getPropertyValue('--freeDay'));

   


    this.storage.set("freeDay", this.freeDayColor);
    

  }

  colorPickerCancel1() {
    this.firstColor = (getComputedStyle(document.body).getPropertyValue('--firstProjectDefault'));
    document.body.style.setProperty('--firstProject', this.firstColor);
    this.storage.set("firstProject", this.firstColor);
  this.firstImportantColor = getComputedStyle(document.body).getPropertyValue('--firstProjectImportantDefault')
    this.storage.set("firstProjectImportant", this.firstImportantColor);
    document.body.style.setProperty('--firstProjectImportant', this.firstImportantColor);

  }
  colorPickerCancel2() {

    this.secondColor = (getComputedStyle(document.body).getPropertyValue('--secondProjectDefault'));
    document.body.style.setProperty('--secondProject', this.secondColor);
    this.storage.set("secondProject", this.secondColor);
     this.secondImportantColor = getComputedStyle(document.body).getPropertyValue('--secondProjectImportantDefault')

    document.body.style.setProperty('--secondProjectImportant', this.secondImportantColor);
    this.storage.set("secondProjectImportant", this.secondImportantColor);
  }

  colorPickerCancel3() {

    this.thirdColor = (getComputedStyle(document.body).getPropertyValue('--thirdProjectDefault'));
    document.body.style.setProperty('--thirdProject', this.thirdColor);
    this.storage.set("thirdProject", this.thirdColor);
    this.thirdImportantColor = getComputedStyle(document.body).getPropertyValue('--thirdProjectImportantDefault')
    this.storage.set("thirdProject", this.thirdColor);
    document.body.style.setProperty('--thirdProjectImportant', this.thirdImportantColor);
  }

  colorPickerCancel4() {
    this.fourthColor = (getComputedStyle(document.body).getPropertyValue('--fourthProjectDefault'));
    document.body.style.setProperty('--fourthProject', this.fourthColor);
    this.storage.set("fourthProject", this.fourthColor);
    this.fourthImportantColor = getComputedStyle(document.body).getPropertyValue('--fourthProjectImportantDefault')
    this.storage.set("fourthProject", this.fourthColor);
    document.body.style.setProperty('--fourthProjectImportant', this.fourthImportantColor);

  }

  colorPickerCancel5() {
  
    this.freeDayColor = (getComputedStyle(document.body).getPropertyValue('--freeDayDefault'));
    document.body.style.setProperty('--freeDay', this.freeDayColor);
    this.storage.set("freeDay", this.freeDayColor);

   

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
