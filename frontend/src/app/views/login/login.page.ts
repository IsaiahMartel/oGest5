import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

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
    private formBuilder: FormBuilder,
    private router: Router, private storage: Storage
  ) { }

  // Crea las validaciones
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6),
      Validators.maxLength(12), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')])],
    },
    );

  }

  // Lee el formulario y se lo envía al backend
  login(form) {
    let user: User = {
      id: null,
      mobileEmail: form.value.email,
      password: form.value.password,
notification: null,
    };
    this.authService.login(user).subscribe(() => {


      this.storage.get('access_token').then(data => {
      
        this.router.navigateByUrl('/home');
        this.loginForm.reset();
      });
     
  
    }
    )
  }

}







