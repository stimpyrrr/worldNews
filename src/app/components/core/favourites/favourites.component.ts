import { Component, OnInit } from '@angular/core';
// import { News } from '../latest-news/interfaces/latest-news';
import { FirestoreService } from '../../../services/firebase/firestore.service';
import { LoginService } from '../../../services/firebase/login.service';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  news: any = [];
  docUser: string;
  loadingShow: boolean = false;  

  constructor(
    private firestoreService: FirestoreService,
    private loginService: LoginService   
  ) { }

  ngOnInit() {
    this.getFavourites();
    
    /* this.loginService.currentUser().then(resp => {
      console.log('user logged --> ', resp);
      if (resp != null) {
        const user = this.firestoreService.getUser(resp.uid);        
        console.log('getuser favourites => ', user);      
      }
    }); */
  } 

  getFavourites(){
    this.loadingShow = true;
    this.loginService.currentUser().then(resp => {
      if (resp != null) {
        this.firestoreService.getUser(resp.uid).then(querySnapshot => {
          querySnapshot.forEach(resp2 => {
            this.docUser = resp2.id;
            this.firestoreService.getFavourites(resp2.id).then(querySnapshot => {
              console.log('que paso con querySnapshot => ', querySnapshot);
              if (querySnapshot.empty) {
                
              }
              else{
                querySnapshot.forEach(resp3 => {
                  this.news.push(resp3.data());
                })                
              }
              this.loadingShow = false;
            });
          });
        });
      }
    });
  }

  deleteFromFav(newDel: any){
    console.log('miedoo => ', newDel);
    newDel.show = false;
    this.loadingShow = true;    
    // console.log('borrar de favorito', newDel.id, this.docUser);
    this.firestoreService.getFavouriteDoc(this.docUser, newDel.id).then(querySnapshot => {
      querySnapshot.forEach(resp => {
        console.log(resp.id);
        this.firestoreService.deleteFavourites(this.docUser, resp.id).then(respDel => {
          console.log('respDel => ', respDel);
          this.news = this.news.filter(newDelFilt => newDelFilt.id.trim() !==  newDel.id.trim());
          this.loadingShow = false;          
          // this.getFavourites();
        });
      });
    });
  }

}
