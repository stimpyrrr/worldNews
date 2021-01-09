import { Component, OnInit } from '@angular/core';
import { News } from '../latest-news/interfaces/latest-news';
import { FirestoreService } from '../../../services/firebase/firestore.service';
import { LoginService } from '../../../services/firebase/login.service';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  news: any = [];

  constructor(
    private firestoreService: FirestoreService,
    private loginService: LoginService   
  ) { }

  ngOnInit() {

    this.loginService.currentUser().then(resp => {
      console.log('user logged --> ', resp);
      if (resp != null) {
        this.firestoreService.getFavourites(resp.uid).then(querySnapshot => {
          querySnapshot.forEach(resp => {
            this.news.push(resp.data());
          })
        });        
      }
    });
    
    /* this.loginService.currentUser().then(resp => {
      console.log('user logged --> ', resp);
      if (resp != null) {
        const user = this.firestoreService.getUser(resp.uid);        
        console.log('getuser favourites => ', user);      
      }
    }); */
  }

}
