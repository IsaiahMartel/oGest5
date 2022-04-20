import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstrumentsPage } from './instruments.page';

const routes: Routes = [
  {
    path: '',
    component: InstrumentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstrumentsPageRoutingModule {}
