import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Screening } from 'src/Models/Screening';
import { Seat } from 'src/Models/Seat';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.scss']
})
export class ScreeningComponent implements OnInit {

  id: number;
  screening: Screening;
  tickets: number = 2;
  selectedSeats: Seat[] = [];
  maxSeats: number;
  loggedIn: boolean;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private apiService: APIService,
    private themeService: ThemeService,
    private tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });

    this.apiService.getScreeningsById(this.id).subscribe(dataAPI => {
      this.screening = dataAPI;
      this.maxSeats = Math.max.apply(Math, this.screening.seats.map(function (o) { return o.seatNumber; }))
    });

    if (this.tokenService.getToken() != null) {
      this.loggedIn = true;
    } else {
      this.tokenService.isLoggedIn().subscribe(dataAPI => {
        this.loggedIn = dataAPI;
      })
    }
  }

  getTheme() {
    return this.themeService.isDarkMode;
  }

  addTicket() {
    if (this.tickets != this.maxSeats) {
      this.tickets++;
    }
  }

  minusTicket() {
    if (this.tickets != 0) {
      this.tickets--;
    }
  }

  getSeats(event) {
    this.selectedSeats = event;
  }

}
