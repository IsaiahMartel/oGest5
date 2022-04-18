import { Component, OnInit, HostListener, Directive } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Validators, FormControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  passwordNotMatch: boolean;
  private errors: String = null;
  constructor(private router: Router,  private storage: Storage, private alertController: AlertController, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$'),

      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required,
      ])],

    }, {
      validators: this.checkIfPasswordMatch.bind(this)
    }
    );
  }



  checkIfPasswordMatch(formGroup: FormGroup) {


    let password = formGroup.get('password').value;
    let confirmPassword = formGroup.get('confirmPassword').value;


    if (confirmPassword != password) {



      formGroup.controls['confirmPassword'].setErrors({ 'incorrect': true });


    } else {
      formGroup.controls['confirmPassword'].setErrors(null);
    }
  }



  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: message,
      message: 'Inténtalo de nuevo.',
      buttons: ['OK']
    });

    await alert.present();
  }
}











