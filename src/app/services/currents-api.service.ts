import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { Observable } from 'rxjs';
import { LatestNews } from '../components/core/latest-news/interfaces/latest-news';
import { Languages } from '../components/core/latest-news/select-options/interfaces/languages';
 

@Injectable({
  providedIn: 'root'
})
export class CurrentsApiService {
  
  readonly apiLatestNews: string = environment.currentsApiConfig.apiLatestNews;
  readonly apiLanguages: string = environment.currentsApiConfig.apiLanguages;
  readonly apiCategory: string = environment.currentsApiConfig.apiCategory;
  readonly apiKey: string = environment.currentsApiConfig.apiKey;

  constructor(
    private http: HttpClient
  ) { }

  getLatestNews(lang: string){
    return this.http.get<LatestNews>(this.apiLatestNews, 
            {params:{
              'apiKey': this.apiKey,
              'language': lang
            }})
  }

  getLanguages(){
    return this.http.get<Languages>(this.apiLanguages, 
            {params:{
              'apiKey': this.apiKey
            }});
  }
  
}
