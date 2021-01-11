// import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  async registerByUserEmail(email: string, pass: string){
    try {
      const respRegister = await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, pass);
      return respRegister.user;
    } catch (error) {
      console.error('register error -> ', error);
      return error;
    }
  }
}
