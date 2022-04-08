import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SqliteViewPageRoutingModule } from './sqlite-view-routing.module';

import { SqliteViewPage } from './sqlite-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SqliteViewPageRoutingModule
  ],
  declarations: [SqliteViewPage]
})
export class SqliteViewPageModule {}
