import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
import { Storage } from '@ionic/storage';
=======

>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5

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
<<<<<<< HEAD
    private router: Router, private storage: Storage
=======
    private router: Router
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
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

    };
    this.authService.login(user).subscribe(() => {


<<<<<<< HEAD
      this.storage.get('access_token').then(data => {
      
        this.router.navigateByUrl('/home');
        this.loginForm.reset();
      });
     
  
=======

      this.router.navigateByUrl('');
      this.loginForm.reset();
>>>>>>> 061e204417dd68f16f88b8abe0e307bdd76858e5
    }
    )
  }

}







