import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryNewsComponent } from './components/category-news/category-news.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { LatestNewsComponent } from './components/latest-news/latest-news.component';
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
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedGuard] 
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
    component: FavouritesComponent
  },
  {
    path: 'technology',
    component: CategoryNewsComponent
  },
  {
    path: 'programming',
    component: CategoryNewsComponent
  },
  {
    path: 'game',
    component: CategoryNewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
