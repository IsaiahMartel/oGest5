import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThemesPageRoutingModule } from './themes-routing.module';

import { ThemesPage } from './themes.page';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThemesPageRoutingModule,
    ColorPickerModule
  ],
  declarations: [ThemesPage]
})
export class ThemesPageModule {}
