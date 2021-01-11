import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { FavouritesComponent } from './components/core/favourites/favourites.component';
import { LatestNewsComponent } from './components/core/latest-news/latest-news.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
// import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { HomeComponent } from './components/home/home.component';
import { LoggedGuard } from './guards/logged.guard';
import { IsLoginGuard } from './guards/is-login.guard';
import { LoggedLoginGuard } from  './guards/logged-login.guard';
import { FavouritesModule } from './modules/favourites/favourites.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  /* {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }, */
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [IsLoginGuard] 
  },
  {
    path: 'LatestNews',    
    component: LatestNewsComponent,
    canActivate: [IsLoginGuard]   
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedLoginGuard, IsLoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedLoginGuard, IsLoginGuard]
  },
  {
    path: 'favourites',
    loadChildren: () => import('./modules/favourites/favourites.module').then(m => m.FavouritesModule),
    // component: FavouritesComponent,
    canActivate: [LoggedGuard, IsLoginGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
