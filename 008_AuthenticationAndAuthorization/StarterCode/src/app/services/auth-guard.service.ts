import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import {Router,CanActivate}  from '@angular/router';
import {AuthService } from './auth.service';

@Injectable()
export class AuthGuardService {

  constructor(
    private router: Router,
    private authService: AuthService)
    { }

    canActivate(route,state: RouterStateSnapshot){
      if(this.authService.isAdmin())    // this.authService.isLoggedIn() using but admin no secure
      {
           return true;
      }

      this.router.navigate(['/login'],
      {queryParams:{returnUrl: state.url}}
  );
  
  return false;
    }
}

