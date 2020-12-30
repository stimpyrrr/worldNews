import { Component, OnInit } from '@angular/core';
import { Languages } from './interfaces/languages';
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
  
  languages: languageSelec[];
  // languagesCode: any = [];

  constructor(
    private currentsApiService: CurrentsApiService
  ) { }

  ngOnInit() {
    this.getLanguages();
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
}
