import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

import { APIService } from './../../services/api.service';
import { Movie } from 'src/Models/Movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute, private apiService:APIService, private themeService: ThemeService) { }

  movie: Movie;

  id: number;
  movieDate: string;

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = Number(params.get('id'));
    })

    // this.apiService.getMovieSpecific(this.id).subscribe(
    //   dataFromApi => {this.movie = dataFromApi}
    // );

    this.apiService.getMovieSpecific(this.id).subscribe(dataAPI => {
      this.movie = dataAPI;
      console.log(dataAPI);
    });
    //console.log(this.movie);

  }
  getTheme() {
    return this.themeService.isDarkMode;
  }

  getObj()
  {
    console.log(this.movie);
  }

  onDateChange(event) {
    this.movieDate = event;
    console.log(this.movieDate);
  }
}
