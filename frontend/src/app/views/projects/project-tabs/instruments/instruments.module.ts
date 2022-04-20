import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstrumentsPageRoutingModule } from './instruments-routing.module';

import { InstrumentsPage } from './instruments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstrumentsPageRoutingModule
  ],
  declarations: [InstrumentsPage]
})
export class InstrumentsPageModule {}
