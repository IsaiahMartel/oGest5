import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PcNotificationTutorialPage } from './pc-notification-tutorial.page';

const routes: Routes = [
  {
    path: '',
    component: PcNotificationTutorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PcNotificationTutorialPageRoutingModule {}
