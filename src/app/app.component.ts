import { Component, OnInit } from '@angular/core';

import { ThemeService } from './services/theme.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'H3CinemaAngular';

  loginState = false;
  isDarkMode = true;
  isLoggedIn: boolean;

  constructor(private themeService: ThemeService, private tokenService: TokenStorageService) {}

  ngOnInit() {
    if (localStorage.getItem('themeState') === null) {
      localStorage.setItem('themeState', 'dark')
      this.themeService.setThemeState(true);
    } else {
      if (localStorage.getItem('themeState') === 'dark') {
        this.isDarkMode = true;
        this.themeService.setThemeState(true);
      } else {
        this.isDarkMode = false;
        this.themeService.setThemeState(false);
      }
    }

    this.isLoggedIn = this.tokenService.isTokenValid();
    this.tokenService.isLoggedIn().subscribe(dataAPI => {
      this.isLoggedIn = dataAPI;
    })
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleThemeState();
    if (this.isDarkMode) {
      localStorage.setItem('themeState', "dark");
    } else {
      localStorage.setItem('themeState', "light");
    }
  }

  receiveLoginState($event) {
    this.loginState = $event;
  }

  receiveUserState($event) {
    this.isLoggedIn = $event;
    if (this.isLoggedIn) {
      setTimeout(() => {
        this.loginState = false;
      }, 1500);
    }
  }

  showLogin() {
    this.loginState = true;
  }
}
