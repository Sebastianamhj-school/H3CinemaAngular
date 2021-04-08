import { Component, Input } from '@angular/core';
import { Screening } from 'src/Models/Screening';

@Component({
  selector: 'app-movie-time',
  templateUrl: './movie-time.component.html',
  styleUrls: ['./movie-time.component.scss']
})
export class MovieTimeComponent {
  
  @Input()
  screening: Screening;
}
