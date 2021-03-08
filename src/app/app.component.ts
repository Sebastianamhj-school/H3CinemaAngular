import { Component, OnInit } from '@angular/core';
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

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    
  }

  toggleTheme() {
    console.log("toggleTheme clicked")
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
  }

  receiveLoginState($event) {
    this.loginState = $event;
  }

  showLogin() {
    this.loginState = true;
  }
}
