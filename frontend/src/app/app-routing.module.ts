import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {
    path: '',
redirectTo: 'home',
pathMatch: "full"
   
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./views/projects/project-tabs/tabs.module').then( m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'themes',
    loadChildren: () => import('./views/themes/themes.module').then( m => m.ThemesPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./views/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'android-notification-tutorial',
    loadChildren: () => import('./views/tutorials/android-notification-tutorial/android-notification-tutorial.module').then( m => m.AndroidNotificationTutorialPageModule)
  },
  {
    path: 'pc-notification-tutorial',
    loadChildren: () => import('./views/tutorials/pc-notification-tutorial/pc-notification-tutorial.module').then( m => m.PcNotificationTutorialPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }