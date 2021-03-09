import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Movie } from  '../../../Models/Movie';
import { from } from 'rxjs';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {

  tempMovieData: any;
  errorMessage: any;

  movies: Movie[] = [
    { "Id": 0, "Title": "Goldfinger", "Runtime": 92, "Rating": 5.5, "AgeRating": "PG 13", "ImgUrl": "", "ReleaseDate": "1964", "Genre": "Action" },
    { "Id": 1, "Title": "Live and Let Die", "Runtime": 122, "Rating": 3.1, "AgeRating": "PG 13", "ImgUrl": "", "ReleaseDate": "1973", "Genre": "Action" },
    { "Id": 2, "Title": "You Only Live Twice", "Runtime": 112, "Rating": 5.8, "AgeRating": "PG 13", "ImgUrl": "", "ReleaseDate": "1967", "Genre": "Action" },
    { "Id": 3, "Title": "Thunderball", "Runtime": 81, "Rating": 3.2, "AgeRating": "PG 13", "ImgUrl": "", "ReleaseDate": "1965", "Genre": "Action" },
    { "Id": 4, "Title": "Dr. No", "Runtime": 111, "Rating": 6.2, "AgeRating": "PG 13", "ImgUrl": "", "ReleaseDate": "1962", "Genre": "Action" }
  ]

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>("https://localhost:44339/api/Movies").subscribe({
      next: data => {
        this.tempMovieData = data[1]["title"];
        console.log(this.tempMovieData);
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

}
