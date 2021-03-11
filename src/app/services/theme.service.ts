import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode: boolean;

  themeStateChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.themeStateChange.subscribe((value) => {
      this.isDarkMode = value
    })
  }

  toggleThemeState() {
    this.themeStateChange.next(!this.isDarkMode);
  }

  setThemeState(darkModeState: boolean) {
    this.isDarkMode = darkModeState;
  }
}
