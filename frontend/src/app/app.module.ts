import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, ToastController } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { GoogleLoginProvider, SocialAuthServiceConfig, SocialAuthService, SocialLoginModule } from 'angularx-social-login';
import { InterceptorService } from './interceptors/interceptor.service';

import {IonicStorageModule, Storage} from '@ionic/storage';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ModalConnectionService } from './services/modal-connection/modal-connection.service';
import { BackendStatusService } from './services/backend-status/backend-status.service';
import { NgCalendarModule  } from 'ionic2-calendar';
import { ColorPickerModule } from 'ngx-color-picker';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HammerModule, 
    BrowserModule,
    IonicModule.forRoot(),  
    IonicStorageModule.forRoot(),
    AppRoutingModule, 
    HttpClientModule,
    SocialLoginModule,
    NgCalendarModule,
    ColorPickerModule,
   
    ServiceWorkerModule.register('sw-master.js', { enabled: true}),

    
    //  ServiceWorkerModule.register(serviceWorkerConfig.serviceWorkerUrl, { enabled: true})

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true,
    deps: [Storage,ModalConnectionService, ToastController]
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

