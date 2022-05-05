import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { GoogleLoginProvider, SocialAuthServiceConfig, SocialAuthService, SocialLoginModule } from 'angularx-social-login';
import { InterceptorService } from './interceptors/interceptor.service';

import {IonicStorageModule} from '@ionic/storage';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HammerModule, BrowserModule,
    IonicModule.forRoot(),  IonicStorageModule.forRoot(),
    AppRoutingModule, HttpClientModule,
     SocialLoginModule,
     ServiceWorkerModule.register('ngsw-worker.js', {
       enabled: environment.production,
       // Register the ServiceWorker as soon as the application is stable
       // or after 30 seconds (whichever comes first).
       registrationStrategy: 'registerWhenStable:30000'
     })],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '496549363577-goftinjkirl8qe42j4g27dv2287qmh14.apps.googleusercontent.com'
          )
        },]
    } as SocialAuthServiceConfig,
  },

  ],

  bootstrap: [AppComponent],
})
export class AppModule { }

