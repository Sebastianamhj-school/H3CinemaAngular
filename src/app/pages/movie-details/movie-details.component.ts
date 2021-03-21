import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

import { APIService } from './../../services/api.service';
import { Movie } from 'src/Models/Movie';
import { Screening } from 'src/Models/Screening';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(
    private _Activatedroute: ActivatedRoute,
    private apiService: APIService,
    private themeService: ThemeService,
    private datePipe: DatePipe) { }

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

  getDistinctDates(): Screening[] {
    var tempScreenings = this.screenings.filter((scr, i, arr) =>
      arr.findIndex(x => this.dateToString(x.time) === this.dateToString(scr.time)) === i)
    
    return tempScreenings.sort((a, b) => this.sortDate(a) - this.sortDate(b));
  }

  private dateToString(date: Date, format:string = 'mediumDate'): string {
    return this.datePipe.transform(date, format, 'en-US');
  }

  private sortDate(screenings: Screening): number {
    return Number(this.dateToString(screenings.time, 'yyyyMMddHHmmss'));
  }

  getDistinctCinema(): Screening[] {
    let dates = this.screenings.filter(x => this.dateToString(x.time) == this.dateToString(this.selectedDate));

    return dates.filter((scr, i, arr) => arr.findIndex(s => s.theater === scr.theater) === i);
  }

  getTimesFromCinema(theater: string): Screening[] {
    return this.screenings.filter(scr =>
      this.dateToString(scr.time) === this.dateToString(this.selectedDate) && scr.theater === theater)
      .sort((a, b) => this.sortDate(a) - this.sortDate(b));
  }


  getTheme() {
    return this.themeService.isDarkMode;
  }

  onDateChange(event: Date) {
    this.selectedDate = event;
  }
}
