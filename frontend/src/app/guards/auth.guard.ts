import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})


// El guard sirven para redireccionar al login si no estás logeado (https://youtu.be/gZ5TNr6aTio)
export class AuthGuard implements CanLoad {
  constructor(private storage: Storage,
    private router: Router,) {
  }

  async canLoad() {
    const token = this.storage.get('access_token').then(data => {
      if (data) {
        return true;
      }
      else {
        return false;
      }
    });

    if (await token == true) {
      return true;
    } else {
      this.router.navigateByUrl("/login"
      )
      return false;
    }
  }
  
}
