import { Component, OnInit, Output, EventEmitter, AbstractType } from '@angular/core';
// import { Languages } from './interfaces/languages';
import { languageSelec } from './interfaces/languages';
import { CurrentsApiService } from '../../../../services/currents-api.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { pipe } from 'rxjs';
import { map } from 'rxjs/operators'; 



@Component({
  selector: 'app-select-options',
  templateUrl: './select-options.component.html',
  styleUrls: ['./select-options.component.css']
})
export class SelectOptionsComponent implements OnInit {
  
  @Output()
  searchLatesNews = new EventEmitter();

  categorySelec: any = 'todas';
  languageSelec: string = 'en';

  languages: languageSelec[];
  categories: Array<string> = [];
  // languagesCode: any = [];

  constructor(
    private currentsApiService: CurrentsApiService
  ) { }

  ngOnInit() {
    this.getLanguages();
    // this.getCategory();
    this.categories = [
        "todas",
        "regional",
        "technology",
        "lifestyle",
        "business",
        "general",
        "programming",
        "science",
        "entertainment",
        "world",
        "sports",
        "finance",
        "academia",
        "politics",
        "health",
        "opinion",
        "food",
        "game"
    ];
    
  }
  
  getLanguages(){
    this.currentsApiService.getLanguages()
    .pipe(map(dato => {
      return [
              {pais: 'English', codigo: dato.languages.English},
              {pais: 'Spanish', codigo: dato.languages.Spanish}
              ]
    }))
    .subscribe(
      (data: languageSelec[]) => {
        this.languages = data;
        console.log(this.languages);
        // this.languagesCode = this.languages.languages;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      },
      () => {
        // console.log('getLatestNews => petición finalizada');
      }
    )
  }

  search(){
    const params = {
      cat: this.categorySelec,
      lang: this.languageSelec      
    };
    this.searchLatesNews.emit(params);
  }
  
}
