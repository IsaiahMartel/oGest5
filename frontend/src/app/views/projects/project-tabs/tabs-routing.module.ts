import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:  [
      {
          path: 'calendar/:id',
          loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
        },
        {
          path: 'calendar/:id',
          loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
        },
      {
        path: 'members/:id',
          loadChildren: () => import('./members/members.module').then(m => m.MembersPageModule)
      },
  
      {
        path: 'works/:id',
 
            loadChildren: () => import('./works/works.module').then(m => m.WorksPageModule)
          
      },
      {
        path: 'instruments/:id',
 
            loadChildren: () => import('./instruments/instruments.module').then(m => m.InstrumentsPageModule)
          
      },
 


    ]

  },
  {
    path: 'instruments',
    loadChildren: () => import('./instruments/instruments.module').then( m => m.InstrumentsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
