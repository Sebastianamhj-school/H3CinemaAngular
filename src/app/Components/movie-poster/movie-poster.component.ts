import { Component, Input } from '@angular/core';
import { Movie } from 'src/Models/Movie';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.scss']
})
export class MoviePosterComponent {

  @Input()
  movie: Movie;
  
  constructor(private themeService: ThemeService) { }

  getTheme() {
    return this.themeService.isDarkMode;
  }
}
