import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';

import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';

registerLocaleData(localePy, 'es');
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CalendarPage],
  providers: [ { provide: LOCALE_ID, useValue: 'es-Py' } ],
})
export class CalendarPageModule {}
