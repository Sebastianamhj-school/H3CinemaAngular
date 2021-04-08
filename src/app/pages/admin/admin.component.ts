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

  navigationItems = [
    ['Movies', 'square'],
    ['Screenings', 'square'],
    ['Users', 'circle'], 
    ['Customers', 'circle'], 
    ['Bookings', 'square']
  ];

  activeNavigation: string[] = this.navigationItems[0];
  searchList: AutoComplete[];
  movieId: number;
  

  constructor(private themeService: ThemeService, private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getAutoComplete("movies").subscribe(dataAPI => {
      this.searchList = dataAPI;
    });
  }

  getTheme() {
    return this.themeService.isDarkMode;
  }

  onNavigationItemClick(i: number) {
    this.activeNavigation = this.navigationItems[i];
  }

}
