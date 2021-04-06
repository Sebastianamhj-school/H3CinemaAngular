import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  navigationItems = ['Movies', 'Screenings', 'Users', 'Customers', 'Bookings'];
  activeNavigation = '';

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  getTheme() {
    return this.themeService.isDarkMode;
  }

  onNavigationItemClick(i: number) {
    console.log(this.navigationItems[i]);
    this.activeNavigation = this.navigationItems[i];
  }

}
