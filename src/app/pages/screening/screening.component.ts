import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Screening } from 'src/Models/Screening';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.scss']
})
export class ScreeningComponent implements OnInit {

  id: number;
  screening: Screening;
  tickets: number = 2;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private apiService: APIService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });

    this.apiService.getScreeningsById(this.id).subscribe(dataAPI => {
      this.screening = dataAPI;
      console.log(this.screening);
    });
  }

  getTheme() {
    return this.themeService.isDarkMode;
  }

}
