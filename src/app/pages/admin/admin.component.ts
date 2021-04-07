import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AutoComplete } from 'src/Models/AutoComplete';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  navigationItems = ['Movies', 'Screenings', 'Users', 'Customers', 'Bookings'];
  activeNavigation = '';
  list: AutoComplete[] = null;

  constructor(private themeService: ThemeService, private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getAutoComplete("movies").subscribe(dataAPI => {
      this.list = dataAPI;
    });
  }

  getTheme() {
    return this.themeService.isDarkMode;
  }

  onNavigationItemClick(i: number) {
    console.log(this.navigationItems[i]);
    this.activeNavigation = this.navigationItems[i];
  }

}
