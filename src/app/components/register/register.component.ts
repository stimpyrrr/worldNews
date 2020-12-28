import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RegisterService } from '../../services/firebase/register.service';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { User } from 'src/app/interfaces/user';
import { passwordValidation } from 'src/app/directives/password-validation.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  get email() { return this.registerForm.get('email')};
  get pass() { return this.registerForm.get('pass')};
  get phones() { return this.registerForm.get('phones') as FormArray}

  public memeberships: any[] = ['basic', 'medium', 'advanced'];
  
  public registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(6), passwordValidation()]),
    name: new FormControl(''),
    memeberships: new FormControl(this.memeberships[0]),
    newsletter: new FormControl(false),
    phones: new FormArray([])
  });

  constructor(
    private RegisterService: RegisterService,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
  }

  addPhone(){
    const phoneGroup = new FormGroup({
      phone: new FormControl(''),
      description: new FormControl('')
    });
    this.phones.push(phoneGroup);
  }

  removePhones(index: number){
    this.phones.removeAt(index);
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
