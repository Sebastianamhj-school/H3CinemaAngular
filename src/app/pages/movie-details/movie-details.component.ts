import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

import { APIService } from './../../services/api.service';
import { Movie } from 'src/Models/Movie';
import { Screening } from 'src/Models/Screening';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute, private apiService:APIService, private themeService: ThemeService) { }

  id: number;
  movie: Movie;
  screenings: Screening[];
  selectedDate: Date;

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    })

    this.apiService.getMovieSpecific(this.id).subscribe(dataAPI => {
      this.movie = dataAPI;
    });

    this.apiService.getScreeningsByMovieId(this.id).subscribe(dataAPI => {
      this.screenings = dataAPI;
    });
  }

  getDistinctDates() {
    return this.screenings.filter((scr, i, arr) => arr.findIndex(s => s.time.getDate == scr.time.getDate) === i);
  }

  getDistinctCinema() {
    return this.screenings.filter((scr, i, arr) => arr.findIndex(s => s.theater == scr.theater) === i);
  }

  getTimesFromDate() {
    return this.screenings.filter(x => x.time.getDate == this.selectedDate.getDate);
  }

  getTimesFromDateAndCinema(theater: string) {
    return this.screenings.filter(x => x.time.getDate == this.selectedDate.getDate && x.theater == theater);
  }

  getTheme() {
    return this.themeService.isDarkMode;
  }

  onDateChange(event: Date) {
    this.selectedDate = event;
  }
}
