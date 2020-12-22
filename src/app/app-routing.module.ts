import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryNewsComponent } from './components/category-news/category-news.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { LatestNewsComponent } from './components/latest-news/latest-news.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'LatestNews'
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
    path: 'logout',
    component: LogoutComponent
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
