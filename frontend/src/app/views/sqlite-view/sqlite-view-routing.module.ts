import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SqliteViewPage } from './sqlite-view.page';

const routes: Routes = [
  {
    path: '',
    component: SqliteViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SqliteViewPageRoutingModule {}
