import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {JwtHelper,tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) { 
   return this.http.post('/api/authenticate', 
      JSON.stringify(credentials))
      .map(Response => {
        const result=Response.json();
        if(result && result.token)
        {
           localStorage.setItem('token',result.token);
           return true;
        }

       return false;
      });
  }

  logout() { 
    localStorage.removeItem('token');
  }

  isLoggedIn() { 


    return tokenNotExpired();
    // return false;
  }

  currentUser()
  {
      const token = localStorage.getItem('token');
      if(!token)
      {
         return null;
      }

      return new JwtHelper().decodeToken(token);
  }

  isAdmin()
  {
    const token = localStorage.getItem('token');
      if(!token)
      {
         return null;
      }
      console.log(token);
      return new JwtHelper().decodeToken(token).admin;
  }
}

