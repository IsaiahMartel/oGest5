import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsPageRoutingModule } from './notifications-routing.module';

import { NotificationsPage } from './notifications.page';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';

registerLocaleData(localePy, 'es');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule
  ],
  declarations: [NotificationsPage],
  providers: [ { provide: LOCALE_ID, useValue: 'es-Py' } ],
})
export class NotificationsPageModule {}
