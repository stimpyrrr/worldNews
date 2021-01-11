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
  loadingShow: boolean = false;  

  constructor(
    private currentsApiService: CurrentsApiService,
    private firestoreService: FirestoreService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.getLatestNews();
  }

  getLatestNews(params: any = ''){
    this.loadingShow = true;
    let lang = '';
    if (params != '') {
      lang = params.lang;
      this.categorySelec = params.cat;
    }
    this.currentsApiService.getLatestNews(lang).subscribe(
      (data: LatestNews) => {
        this.news = data.news;
        this.news.forEach(item => {
          item.show = false;
          item.iconFav = false;
        });
        this.loginService.currentUser().then(resp => {
          console.log('que onda el current user => ', resp);
          if (resp != null) {
            // console.log('paso el nulll =>', this.news );
            this.firestoreService.getUser(resp.uid).then(querySnapshot => {
              querySnapshot.forEach(resp2 => {
                this.firestoreService.getFavourites(resp2.id).then(querySnapshot => {
                  if (querySnapshot.empty) {
                    this.news.forEach(item => {
                      item.show = true;
                      item.iconFav = false;
                    });
                  }
                  else{
                    querySnapshot.forEach(resp3 => {
                      
                      this.news.filter( arr => {
                        console.log(arr.id.trim() ,'===', resp3.data().id.trim());
                        if (arr.id === resp3.data().id) {
                            arr.show = false;
                            arr.iconFav = true;
                        }
                        else{
                          arr.show = true;
                        }
                      });
                      console.log('aeeerssssssssssssss => ', resp3.data().id);
                    })                
                  }
                  this.loadingShow = false;
                });
              });
            });
          }
        });
        /* this.news.forEach( item => {
          item.checked = false;
          
          this.loginService.currentUser().then(resp => {
            if (resp != null) {
              item.show = true;
            }
            else{
              item.show = false;
            }
          });          
        }); */
        this.loadingShow = false;        
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
    this.loadingShow = true;
    // const addToFavourites = e.target.checked;
    const addToFavourites = newSelec.checked;
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
    setTimeout(()=>{
      newSelec.show = false;
      this.loadingShow = false;
      newSelec.iconFav = true;
    }, 1000);    
    // console.log('salvado a favoritos => ', e.target.checked, newSelec);
  }

}
