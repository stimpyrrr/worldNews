import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CardNewsComponent } from './components/card-news/card-news.component';
import { LatestNewsComponent } from './components/latest-news/latest-news.component';
import { CategoryNewsComponent } from './components/category-news/category-news.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { LogoutComponent } from './components/logout/logout.component';

/* FIREBASE */
import { AngularFireModule } from '@angular/fire';
import {  AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

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
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
