import { Injectable } from '@angular/core';
import { CanLoad, QueryParamsHandling, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
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