import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { LoginService } from '../services/firebase/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  
  private logged: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.loginService.currentUser().then(resp => {
      if(resp.uid != null ){
        this.logged = true;
      }
      else{
        window.alert('protected route');
        this.logged = false;
        this.router.navigate(['login']);
      }
      return this.logged;
    }).catch(error => {
      console.log('error promise guard -> ', error);
      this.logged = false;
      window.alert('protected route');
      this.router.navigate(['login']);
    });
    return this.logged;
  }
  
}
