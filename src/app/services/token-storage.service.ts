import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  TOKEN_KEY: string = '';

  tokenStateChange: Subject<boolean> = new Subject<boolean>();

  constructor() { }


  public saveToken(token: string): void {
    localStorage.removeItem('Bearer');
    localStorage.setItem('Bearer', token);
  }

  public signOut(): void {
    localStorage.clear();
  }

  public getToken(): any {
    return localStorage.getItem('Bearer');
  }

  public decodeToken(): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(localStorage.getItem('Bearer'));
  }

  public isTokenValid(): any {
    console.log(this.isTokenExpired() + " " + this.getToken())
    if (this.isTokenExpired() && this.getToken() !=null) {
      return true;
    }
    return false;
  }

  public isTokenExpired(): boolean {
    try { 
      const expiry = (JSON.parse(atob(localStorage.getItem('Bearer').split('.')[1]))).exp;
      if ((Math.floor((new Date).getTime() / 1000)) >= expiry) {
        return false
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}
