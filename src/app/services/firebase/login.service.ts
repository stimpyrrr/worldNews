// import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {  

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  async login(email: string, password: string){
    try {
      const respoAuth = await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
      console.log('respoAuth-->', respoAuth);
      return respoAuth.user;
    } catch (error) {
      console.error('error auth ->',error);
      return error;
    }
  }

  async logout(){
    try {
      const logoutResp = await this.angularFireAuth.auth.signOut();
      console.log('logout exitoso');
      return logoutResp;
    } catch (error) {
      console.error('logout error ->', error);
      return error;    
    }
  }

  async currentUser(){
    try {
      const currentUser = this.angularFireAuth.auth.currentUser;
      return currentUser;
    } catch (error) {
      return error;
    }
  }
}
