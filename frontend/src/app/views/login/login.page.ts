import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private storage: Storage,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), 
        Validators.maxLength(12), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')])],
    },
    );

  }


  login(form) {


    let user: User = {
      id: null,
     mobileEmail: form.value.email,
      password: form.value.password,
   
    };
    this.authService.login(user).subscribe(() => {
    
      
    
      this.router.navigateByUrl('');
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







