import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from '../../services/firebase/register.service';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm = new FormGroup({
    email: new FormControl(''),
    pass: new FormControl(''),
    name: new FormControl('')
  });

  constructor(
    private RegisterService: RegisterService,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
  }

  register(){
    this.RegisterService.registerByUserEmail(this.registerForm.value.email, this.registerForm.value.pass).then(resp => {
      console.log('registro exitoso -> ', resp);
      const newRegisterDB: User = {
        email: resp.email,
        emailVerified: resp.emailVerified,
        name: this.registerForm.value.name,
        phoneNumber: '',
        uid: resp.uid
      }
      this.firestoreService.createUser(newRegisterDB).then(resp => {
        console.log('uid new user --> ', resp);
      });
    }).catch(error => {
      console.error('error en registro -> ', error);
    });
    console.log('try register ->', this.registerForm.value);
  }

}
