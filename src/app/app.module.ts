import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CardNewsComponent } from './components/card-news/card-news.component';
import { LatestNewsComponent } from './components/latest-news/latest-news.component';
import { CategoryNewsComponent } from './components/category-news/category-news.component';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { LogoutComponent } from './components/logout/logout.component';

const rutas: Routes = [
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
  declarations: [
    AppComponent,
    HeaderComponent,
    CardNewsComponent,
    LatestNewsComponent,
    CategoryNewsComponent,
    LoginComponent,
    RegisterComponent,
    FavouritesComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(rutas, {
      useHash: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
