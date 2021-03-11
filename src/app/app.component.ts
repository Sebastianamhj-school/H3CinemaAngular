import { Component, Input, OnInit } from '@angular/core';
import { from } from 'rxjs';

import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'H3CinemaAngular';

  loginState = false;
  isDarkMode = true;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    if (localStorage.getItem('themeState') === null) {
      localStorage.setItem('themeState', 'dark')
    } else {
      if (localStorage.getItem('themeState') === 'dark') {
        this.isDarkMode = true;
        this.themeService.setThemeState(true);
      } else {
        this.isDarkMode = false;
        this.themeService.setThemeState(false);
      }
    }
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

  showLogin() {
    this.loginState = true;
  }
}
