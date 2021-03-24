import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  TOKEN_KEY: string = '';

  constructor() { }


  public saveToken(token: string): void {
    localStorage.removeItem('TOKEN_KEY');
    localStorage.setItem('TOKEN_KEY', token);
  }

  public signOut(): void {
    localStorage.clear();
  }

  public getToken(): any {
    return localStorage.getItem('TOKEN_KEY');
  }
}
