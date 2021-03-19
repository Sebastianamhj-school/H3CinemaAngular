import { Component, Input, OnInit } from '@angular/core';
import { Screening } from 'src/Models/Screening';

@Component({
  selector: 'app-movie-time',
  templateUrl: './movie-time.component.html',
  styleUrls: ['./movie-time.component.scss']
})
export class MovieTimeComponent implements OnInit {
  
  @Input()
  screening: Screening;

  ngOnInit(): void {
  }

}
