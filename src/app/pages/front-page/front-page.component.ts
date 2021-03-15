import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/Models/Movie';
import { APIService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {

  movieData: Movie[];
  isDarkMode: boolean;

  constructor(private themeService: ThemeService, private apiService:APIService) { }

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode;

    this.themeService.themeStateChange.subscribe(value => {
      this.isDarkMode = value;
    })

    this.apiService.getMovies().subscribe(dataAPI => {
      this.movieData = dataAPI;
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
    //console.log(this.isDarkMode);
  }
}