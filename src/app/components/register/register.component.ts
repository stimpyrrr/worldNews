import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from '../../services/firebase/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm = new FormGroup({
    email: new FormControl(''),
    pass: new FormControl('')
  });

  constructor(
    private RegisterService: RegisterService
  ) { }

  ngOnInit() {
  }

  register(){
    this.RegisterService.registrar(this.registerForm.value.email, this.registerForm.value.pass).then(resp => {
      console.log('registro exitoso -> ', resp);
    }).catch(error => {
      console.error('error en registro -> ', error);
    });
    console.log('try register ->', this.registerForm.value);
  }

}
