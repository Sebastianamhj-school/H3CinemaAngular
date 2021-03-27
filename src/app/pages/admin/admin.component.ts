import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  getTheme() {
    return this.themeService.isDarkMode;
  }

}
