import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/Models/Movie';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.scss']
})
export class MoviePosterComponent implements OnInit {

  @Input()
  movie: Movie;
  
  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  getTheme() {
    return this.themeService.isDarkMode;
  }
}
