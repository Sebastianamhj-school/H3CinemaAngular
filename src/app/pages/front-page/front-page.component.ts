import { APIService } from './../../services/api.service';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/Models/Movie';

import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {

  tempMovieData: Movie[];
  errorMessage: any;
  isDarkMode: boolean;

  constructor(private themeService: ThemeService, private apiService:APIService) { }

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode;
    this.themeService.themeStateChange.subscribe(value => {
      this.isDarkMode = value;
    })

    this.apiService.getMovies().subscribe(dataAPI => {
      this.tempMovieData = dataAPI;
    })
    // this.http.get<any>("https://localhost:44339/api/Movies").subscribe({
    //   next: data => {
    //     this.tempMovieData = data;
    //     console.log(this.tempMovieData);
    //   },
    //   error: error => {
    //     this.errorMessage = error.message;
    //     console.error('There was an error!', error);
    //   }
    // })
    console.log(this.isDarkMode);
  }

}
