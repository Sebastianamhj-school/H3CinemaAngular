import { Customer } from 'src/Models/Customer';
import { Movie } from 'src/Models/Movie';
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

  baseUrl:string = "https://localhost:44339/api/";

  /* getbookingUrl:string = this.baseUrl + "/Bookings";
  getcustomersUrl:string = this.baseUrl + "/Customers";
  getmoviesUrl:string = this.baseUrl + "/Movies";
  getmoviesRandomUrl:string = this.getmoviesUrl + "/Random";
  putmovieUrl:string = this.baseUrl + "/Movies/"; */

  constructor(private http:HttpClient) {}

  // postUser(body: User): Observable<User> {
  //   return this.http
  //     .post<User>(baseUrl + `Users/CreateUser`, body, httpOptions);
  // }

  async postCustomerSync(body: Customer) //Sync call
  {
    return await this.http.post(this.baseUrl + `Customers`, body, httpOptions).toPromise;
  }

  // Get all movies
  getMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.baseUrl + `Movies`)
    .pipe( //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
      );
  }

  getMoviesRange(start:number, end:number):Observable<Movie[]>{
    return this.http.get<Movie[]>(this.baseUrl + `Movies/Range/${start}-${end}`)
    .pipe( //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
      );
  }

  // Get a specific movie
  getMovieSpecific(id:number):Observable<Movie>{
    return this.http.get<Movie>(this.baseUrl + `Movies/${id}`)
    .pipe( //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
      );
  }

  // Get 20 random movies
  getMoviesRandom():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.baseUrl + `Movies/Random`)
    .pipe( //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
      );
  }

  // Get n amount of random movies
  getMoviesRandomAmount(amount:number):Observable<Movie[]>{
    return this.http.get<Movie[]>(this.baseUrl + `Movies/Random/${amount}`)
    .pipe( //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
      );
  }

  updateMovie(movie:Movie):Observable<Movie>{
    return this.http.put<Movie>(this.baseUrl + `Movies`, movie)
    .pipe( //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
    );
  }

  postCustomer(body: Customer): Observable<Customer> {
    return this.http
      .post<Customer>(this.baseUrl + `Customers`, body, httpOptions);
  }

  // getScreenings(): Observable<Screening[]> {
  //   return this.http.get<Screening[]>(this.baseUrl + `Screenings`).pipe(
  //     //Catch error, if error retry 3 times before error
  //     retry(3),
  //     catchError(this.handleError)
  //   );
  // }

  getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.baseUrl + `Customers`)
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
