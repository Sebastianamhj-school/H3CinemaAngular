import { APIService } from './../../services/api.service';
import { Movie } from 'src/Models/Movie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute, private apiService:APIService, private themeService: ThemeService) { }

  movie: Movie;

  id: number;

  ngOnInit(): void {


    this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = Number(params.get('id'));
      console.log(this.id);


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


}
