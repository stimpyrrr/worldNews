import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavouritesComponent } from './components/core/favourites/favourites.component';
import { LatestNewsComponent } from './components/core/latest-news/latest-news.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
// import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { HomeComponent } from './components/home/home.component';
import { LoggedGuard } from './guards/logged.guard';


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
    component: HomeComponent    
  },
  {
    path: 'LatestNews',
    component: LatestNewsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'favourites',
    component: FavouritesComponent,
    canActivate: [LoggedGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
