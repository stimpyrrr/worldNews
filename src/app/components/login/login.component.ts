import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../../services/firebase/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public loginForm = new FormGroup({
    email: new FormControl(''),
    pass: new FormControl('')
  });

  constructor(
    private LoginService: LoginService
  ) { }

  ngOnInit() {
  }
  
  onLogin(){
    this.LoginService.login(this.loginForm.value.email, this.loginForm.value.pass).then(resp => {
      console.log('resp then->', resp);
    }).catch(error => {
      console.error('resp error->', error);
    });
    console.log("submit form", this.loginForm.value);
  }
}
