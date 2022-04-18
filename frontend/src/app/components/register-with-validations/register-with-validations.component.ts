
import { Component, OnInit, HostListener, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user/user';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Validators, FormControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-with-validations',
  templateUrl: './register-with-validations.component.html',
  styleUrls: ['./register-with-validations.component.scss'],
})
export class RegisterWithValidationsComponent implements OnInit {
  registerForm: FormGroup;
  passwordNotMatch: boolean;
  private errors: String = null;
  constructor(private router: Router, private authService: AuthService, private storage: Storage, private alertController: AlertController, private formBuilder: FormBuilder) { }

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
        // Validators.minLength(6),
        // Validators.maxLength(12),
      ])],

    }, {
      validators: this.checkIfPasswordMatch.bind(this)
    }
      //{validator: RegisterPage.passwordsMatch}
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

  register() {
    console.log(this.registerForm.value.email);
    let user: User = {
      id: null,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      name: this.registerForm.value.name,
      isAdmin: false
    };



    this.authService.register(user).subscribe(
      (res) => {
        console.log(res);
        if (res.user) {

          //  this.storage.set("token", res.access_token);
        }
        this.router.navigateByUrl('home');
        this.registerForm.reset();
      },
      (error) => {
        let errorJSON = JSON.parse(error.error)
        let errorMessage = ""
        Object.values(errorJSON).forEach(element => errorMessage += element + "\n");
        console.log(errorMessage);

        this.presentAlert(errorMessage);
      });

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











