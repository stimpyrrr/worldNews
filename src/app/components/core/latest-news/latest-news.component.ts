import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CurrentsApiService } from '../../../services/currents-api.service';
import { LatestNews } from './interfaces/latest-news';
import { News } from './interfaces/latest-news';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
})
export class LatestNewsComponent implements OnInit {
  
  news: News[] = [];
  categorySelec: string;

  constructor(
    private currentsApiService: CurrentsApiService
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

}
