import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { User } from 'src/app/interfaces/user';

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

  getUser(uid: string){
    this.angularFirestore.firestore.collection('users').where('uid', '==', uid).get().then(querySnapshot => {
      querySnapshot.forEach(resp => {
        console.log('data recovery from get -->', resp.data());
      })
    });
  }
}
