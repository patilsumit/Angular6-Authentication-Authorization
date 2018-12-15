import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs//add/operator/map';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) {
   return this.http.post('/api/authenticate',
      JSON.stringify(credentials))
      .map(response => {
        const result = response.json();
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          return true;
        }

        return false;
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    // const jwtHelper = new JwtHelper();
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   return false;
    // }

    // const expirationDate = jwtHelper.getTokenExpirationDate(token);
    // const isExpired = jwtHelper.isTokenExpired(token);

    // console.log('Expiration: ', expirationDate);
    // console.log('isExpired: ', isExpired);

    // return !isExpired;
    return tokenNotExpired();
  }

  currentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    return new JwtHelper().decodeToken(token);
  }
}

