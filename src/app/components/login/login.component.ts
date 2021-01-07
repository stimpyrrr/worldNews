import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../../services/firebase/login.service';
import { LogoutService } from '../../services/logout.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logoutSub = new Subscription;
  user: any = {};  
  alert: any = {
    message: '',
    show: false,
    type: ''
  };
  
  public loginForm = new FormGroup({
    email: new FormControl(''),
    pass: new FormControl('')
  });

  constructor(
    private LoginService: LoginService,
    private LogoutService: LogoutService
  ) { }

  ngOnInit() {
    this.logoutSub = this.LogoutService.logout$.subscribe(resp => {
      console.log("funciona el logout");
      this.logOut();
    });

    this.LoginService.currentUser().then(resp => {
      console.log('currentUser => ', resp);
    });
  }

  ngOnDestroy(){
    // this.logoutSub.unsubscribe();
  }
  
  onLogin(){
    this.LoginService.login(this.loginForm.value.email, this.loginForm.value.pass).then(resp => {
      console.log('resp then->', resp);
      if (resp.code == 'auth/user-not-found') {
        this.alert.type = 'error';
        this.alert.message = resp.message;
        this.alert.show = true;
      }
      else{
        this.user = resp;
        console.log('this.user => ', this.user);
      }
    }).catch(error => {
      console.error('resp error->', error);
    });
    console.log("submit form", this.loginForm.value);
  }

  logOut(){
    this.LoginService.logout().then(resp => {
      console.log('logout ok ->', resp);
    }).catch(error => {
      console.log('error logout ->', error);
    });
  }
  
  currentUser(){
    
  }
}
