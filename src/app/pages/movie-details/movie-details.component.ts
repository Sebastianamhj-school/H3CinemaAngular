import { APIService } from './../../services/api.service';
import { Movie } from 'src/Models/Movie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute, private apiService:APIService) { }

  movie: Movie;

  id: number;

  ngOnInit(): void {


    this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = Number(params.get('id'));
    })

    this.apiService.getMovieSpecific(this.id).subscribe(
      dataFromApi => this.movie = dataFromApi
    );

  }

}
