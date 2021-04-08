import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  loggedIn: boolean;

  logger: Subject<boolean> = new Subject<boolean>();

  constructor() { }


  public saveToken(token: string): void {
    localStorage.removeItem('Bearer');
    localStorage.setItem('Bearer', token);
    this.loggedIn = true;
    this.logger.next(this.loggedIn);
  }

  public signOut(): void {
    localStorage.removeItem('Bearer');
    this.loggedIn = false;
    this.logger.next(this.loggedIn);
  }

  public getToken(): any {
    return localStorage.getItem('Bearer');
  }

  public isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable();
  }

  public decodeToken(): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(localStorage.getItem('Bearer'));
  }

  public isAdmin() {
    var temp = this.decodeToken();
    return temp.role === 'Admin';
  }

  public getCustomerId() {
    var temp = this.decodeToken();
    return temp.CustomerId
  }

  public getUserId() {
    var temp = this.decodeToken();
    return temp.unique_name;
  }

  public isTokenValid(): any {
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
