import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule, IonicRouteStrategy, ToastController } from '@ionic/angular';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { NgCalendarModule } from 'ionic2-calendar';
import { ColorPickerModule } from 'ngx-color-picker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterceptorService } from './interceptors/interceptor.service';
import { CheckOnlineStatus } from './services/checkOnlineStatus/check-online-status.service';

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

    // Registra el service worker 
    ServiceWorkerModule.register('sw-master.js', { enabled: true}),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true,
    deps: [Storage, ToastController]
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

