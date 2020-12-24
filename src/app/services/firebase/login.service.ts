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
      return respoAuth.user.uid;
      // console.log('respoAuth-->', respoAuth);
    } catch (error) {
      console.error('error auth ->',error);
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
}
