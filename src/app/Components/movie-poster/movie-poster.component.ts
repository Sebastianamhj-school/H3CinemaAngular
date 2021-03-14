import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/Models/Movie';

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.scss']
})
export class MoviePosterComponent implements OnInit {

  @Input()
  movie: Movie;
  
  constructor() { }

  ngOnInit(): void {
  }

}
