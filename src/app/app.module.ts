import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LatestNewsComponent } from './components/core/latest-news/latest-news.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FavouritesComponent } from './components/core/favourites/favourites.component';

/* FIREBASE */
import { AngularFireModule } from '@angular/fire';
import {  AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

/* FIREBASE */
import { AngularFirestoreModule } from '@angular/fire/firestore';

/* FORMS */
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { LoggedGuard } from './guards/logged.guard';
import { PasswordValidationDirective } from './directives/password-validation.directive';
import { FooterComponent } from './components/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { FilterCategoryPipe } from './pipes/filter-category.pipe';
import { SelectOptionsComponent } from './components/core/latest-news/select-options/select-options.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LatestNewsComponent,
    LoginComponent,
    RegisterComponent,
    FavouritesComponent,
    HomeComponent,
    PasswordValidationDirective,
    FooterComponent,
    FilterCategoryPipe,
    SelectOptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [LoggedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
