import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AndroidNotificationTutorialPageRoutingModule } from './android-notification-tutorial-routing.module';

import { AndroidNotificationTutorialPage } from './android-notification-tutorial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AndroidNotificationTutorialPageRoutingModule
  ],
  declarations: [AndroidNotificationTutorialPage]
})
export class AndroidNotificationTutorialPageModule {}
