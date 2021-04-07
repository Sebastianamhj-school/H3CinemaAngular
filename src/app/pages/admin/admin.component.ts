import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  navigationItems = [
    ['Movies', 'square'],
    ['Screenings', 'square'],
    ['Users', 'circle'], 
    ['Customers', 'circle'], 
    ['Bookings', 'square']
  ];

  activeNavigation = this.navigationItems[0];
  

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  getTheme() {
    return this.themeService.isDarkMode;
  }

  onNavigationItemClick(i: number) {
    this.activeNavigation = this.navigationItems[i];
  }

}
