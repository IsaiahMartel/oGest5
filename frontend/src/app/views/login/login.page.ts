import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private storage: Storage,
    private router: Router
  ) {}

  login(form) {
    this.authService.login(form.value).subscribe((res) => {
      if(!res){
        return this.presentAlert("Error");
      }
       localStorage.setItem("token", res.access_token);
       this.storage.set("token", res.access_token);
      this.router.navigateByUrl('home');
    });
  }


  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: message,
      message: 'Could not login. Try again.',
      buttons: ['OK']
    });

    await alert.present();
  }
}







