import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AndroidNotificationTutorialPage } from './android-notification-tutorial.page';

const routes: Routes = [
  {
    path: '',
    component: AndroidNotificationTutorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AndroidNotificationTutorialPageRoutingModule {}
