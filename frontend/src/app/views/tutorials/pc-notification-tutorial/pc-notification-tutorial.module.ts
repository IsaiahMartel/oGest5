import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PcNotificationTutorialPageRoutingModule } from './pc-notification-tutorial-routing.module';

import { PcNotificationTutorialPage } from './pc-notification-tutorial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PcNotificationTutorialPageRoutingModule
  ],
  declarations: [PcNotificationTutorialPage]
})
export class PcNotificationTutorialPageModule {}
