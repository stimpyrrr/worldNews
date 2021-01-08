import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../../services/logout.service';
import { Subscription } from 'rxjs';
import { IsLoginService } from '../../services/is-login.service';
import { LoginService } from '../../services/firebase/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin = new Subscription;
  logged: boolean = false;
  email: string;

  constructor(
    private LogoutService: LogoutService,
    private IsLoginService: IsLoginService,
    private LoginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.IsLoginService.isLogin$.subscribe(resp => {
      console.log('IsLoginService', resp);
      console.log('this.logged en el header => ', this.logged);
      if(!this.logged){
        this.isLogged();
      }
    });        
  }

  logout(){
    this.LogoutService.logout$.next();
    this.logged = false;
    this.router.navigate(['login']);
  }

  isLogged(){
    console.log('this.logged => ', this.logged);
    this.LoginService.currentUser().then(resp => {
      console.log('currentUser => ', resp);
      if (resp != null) {
        this.email = resp.email;
        this.logged = true;
      }      
    });
  }

}
