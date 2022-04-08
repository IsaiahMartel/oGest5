import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatWithLaravelPageRoutingModule } from './chat-with-laravel-routing.module';

import { ChatWithLaravelPage } from './chat-with-laravel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatWithLaravelPageRoutingModule
  ],
  declarations: [ChatWithLaravelPage]
})
export class ChatWithLaravelPageModule {}
