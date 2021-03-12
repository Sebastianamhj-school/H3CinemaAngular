import { Customer } from './../../Models/Customer';
import { Movie } from './../../Models/Movie';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})


export class APIService {



  baseUrl:string = "https://localhost:44339/api";

  getbookingUrl:string = this.baseUrl + "/Bookings";
  getcustomersUrl:string = this.baseUrl + "/Customers";
  getmoviesUrl:string = this.baseUrl + "/Movies";
  getmoviesRandomUrl:string = this.getmoviesUrl + "/Random";

  putmovieUrl:string = this.baseUrl + "/Movies/";

  constructor(private http:HttpClient) {}

  getMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.getmoviesUrl)
    .pipe( //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
      );
  }

  getMovieSpecific(id:number):Observable<Movie[]>{
    return this.http.get<Movie[]>(this.getmoviesUrl + "/" + id)
    .pipe( //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
      );
  }

  getMoviesRandom():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.getmoviesRandomUrl)
    .pipe( //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
      );
  }

  getMoviesRandomAmount(amount:number):Observable<Movie[]>{
    return this.http.get<Movie[]>(this.getmoviesRandomUrl + "/" + amount)
    .pipe( //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
      );
  }

  updateMovie(movie:Movie):Observable<Movie>{
    return this.http.put<Movie>(this.putmovieUrl, movie)
    .pipe(
      retry(3),
      catchError(this.handleError)

    );
    // return this.http.get<Movie[]>(this.getmoviesRandomUrl + "/" + amount)
    // .pipe( //Catch error, if error retry 3 times before error
    //   retry(3),
    //   catchError(this.handleError)

  }




  getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.getcustomersUrl)
    .pipe( //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
      );
  }





  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}
