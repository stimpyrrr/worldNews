import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/firebase/login.service';
import { LogoutService } from '../../services/logout.service';
import { IsLoginService } from '../../services/is-login.service';
import { Router } from '@angular/router';
// import { Location } from '@angular/common';
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

  get email() { return this.loginForm.get('email')};
  get pass() { return this.loginForm.get('pass')};
  
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private LoginService: LoginService,
    private LogoutService: LogoutService,
    private IsLoginService: IsLoginService,
    private router: Router
    // private location: Location    
  ) { 
  }

  ngOnInit() {    
    this.logoutSub = this.LogoutService.logout$.subscribe(resp => {
      console.log("funciona el logout");
      this.logOut();
    });    
  }

  ngOnDestroy(){
    // this.logoutSub.unsubscribe();
  }
  
  onLogin(){
    // e.preventDefault;
    this.LoginService.login(this.loginForm.value.email, this.loginForm.value.pass).then(resp => {
      console.log('resp then->', resp);
      if (resp.code == 'auth/user-not-found' || resp.code == 'auth/wrong-password') {
        this.alert.type = 'error';
        this.alert.message = resp.message;
        this.alert.show = true;
      }
      else{
        this.IsLoginService.isLogin$.next();
        this.user = resp;
        // this.location.replaceState('/');
        this.router.navigate(['']);
        // console.log('this.user => ', this.user);
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
  
  goToRegister(){
    this.router.navigate(['register']);
  }
  
}
