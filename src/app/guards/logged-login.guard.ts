import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/firebase/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedLoginGuard implements CanActivate {
  
  logged: boolean = true;

  constructor(
    private loginService: LoginService,
    private router: Router
  ){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.loginService.currentUser().then(resp => {
      console.log('guardsss => ', resp);
      if(resp != null ){        
        console.log('totalmente logueado');
        this.logged = false;
        this.router.navigate(['home']);        
      }
      else{
         /* console.log('noooo loeguead', state.url);
        if (state.url == '/login') {
          this.router.navigate(['login']);          
        } */
        // this.router.navigate(['login']);
        this.logged = true;  
      }
      // return this.logged;
    }).catch(error => {
      console.log('error promise guard -> ', error);
      // this.logged = false;
      // window.alert('protected route');
      // this.router.navigate(['login']);
      this.logged = false;  
    });
    console.log('GUARD LOGIN => ', this.logged);
    return this.logged;
    ;
  }
  
}
