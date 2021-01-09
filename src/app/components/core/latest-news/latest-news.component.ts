import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CurrentsApiService } from '../../../services/currents-api.service';
import { LatestNews } from './interfaces/latest-news';
import { News } from './interfaces/latest-news';
import { FirestoreService } from '../../../services/firebase/firestore.service';
import { LoginService } from '../../../services/firebase/login.service';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
})
export class LatestNewsComponent implements OnInit {
  
  news: News[] = [];
  categorySelec: string;
  favourites: News[] = [];  

  constructor(
    private currentsApiService: CurrentsApiService,
    private firestoreService: FirestoreService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.getLatestNews();
  }

  getLatestNews(params: any = ''){
    let lang = '';
    if (params != '') {
      lang = params.lang;
      this.categorySelec = params.cat;
    }
    this.currentsApiService.getLatestNews(lang).subscribe(
      (data: LatestNews) => {
        this.news = data.news;
        console.log('getLatestNews => ',this.news);
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      },
      () => {
        // console.log('getLatestNews => petición finalizada');
      }
    );
  }

  saveToFavourites(e: any, newSelec: any){
    const addToFavourites = e.target.checked;
    if (addToFavourites) {
      // this.favourites.push(newSelec);
      this.loginService.currentUser().then(user => {
        const respAddFavourites = this.firestoreService.addFavourites(user.uid, newSelec);
        console.log('respAddFavourites => ', respAddFavourites);
      });
      // console.log('agregar a favoritos', newSelec);
    }
    else{
      console.log('eliminar de favoritos');
    }
    console.log('salvado a favoritos => ', e.target.checked, newSelec);
  }

}
