import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatWithLaravelPage } from './chat-with-laravel.page';

const routes: Routes = [
  {
    path: '',
    component: ChatWithLaravelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatWithLaravelPageRoutingModule {}
