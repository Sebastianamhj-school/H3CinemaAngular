import { Movie } from 'src/Models/Movie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute) { }

  movie: Movie;

  id: string;

  ngOnInit(): void {


    this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      //movie = params.get(id);
      //this.movie.id = Number(params.get('id'));
      this.id = params.get('id');
    })
  }

}
