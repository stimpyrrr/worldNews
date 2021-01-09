import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/interfaces/user';
import { News } from '../../components/core/latest-news/interfaces/latest-news';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private angularFirestore: AngularFirestore
  ) { }

  async createUser(data: User): Promise<any>{
    try {
      const newUser = await this.angularFirestore.collection('users').add(data);      
      console.log("new user service --> ", newUser);
      return newUser.id;
    } catch (error) {
      return error;
    }
  }

  addFavourites(uid: string, data: News){
    this.angularFirestore.firestore.collection('users').where('uid', '==', uid).get().then(querySnapshot => {
      querySnapshot.forEach(resp => {
        try{
          const favourites = this.angularFirestore.collection('users').doc(resp.id).collection('favourites').add(data);
        } catch (error) {
          console.error(error);
        }
      })
    });
    
  }
  
  getFavourites(uid: string){
    const favourites = this.angularFirestore.firestore.collection('users').where('uid', '==', uid).firestore.collectionGroup('favourites').get();
    return favourites;
  }

  async getUser(uid: string){
    const user = await this.angularFirestore.firestore.collection('users').where('uid', '==', uid).get();
    return user;
  }

  /* getUser(uid: string){
    this.angularFirestore.firestore.collection('users').where('uid', '==', uid).get().then(querySnapshot => {
      querySnapshot.forEach(resp => {
        console.log('data recovery from get -->', resp.data());
      })
    });
  } */  
}
