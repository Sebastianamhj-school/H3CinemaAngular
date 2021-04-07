import { Customer } from 'src/Models/Customer';
import { Movie } from 'src/Models/Movie';
import { User } from 'src/Models/User';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Screening } from 'src/Models/Screening';
import { Booking } from 'src/Models/Booking';
import { AutoComplete } from 'src/Models/AutoComplete';


const baseUrl = 'http://localhost:5000/api/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class APIService {


  constructor(private http: HttpClient) {}

  getToken(username: string, password: string): Observable<User> {
    return this.http
      .get<User>(baseUrl + `Users/login?username=${username}&password=${password}`)
      .pipe(retry(3), catchError(this.handleError));
  }

  Login(body: User): Observable<User> {
    return this.http
      .post<User>(baseUrl + `Users/login`, body, httpOptions);
  }

  checkUserName(username: string): Observable<boolean> {
    return this.http.get<boolean>(baseUrl + `Users/CheckUserName?username=${username}`)
    .pipe(retry(3), catchError(this.handleError));
  }

  postUser(body: User): Observable<User> {
    return this.http
      .post<User>(baseUrl + `Users/CreateUser`, body, httpOptions);
  }

  async postCustomerSync(body: Customer) //Sync call
  {
    return await this.http.post(baseUrl + `Customers`, body, httpOptions).toPromise;
  }

  // Get all movies
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(baseUrl + `Movies`).pipe(
      //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
    );
  }

  getMoviesRange(start: number, end: number): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(baseUrl + `Movies/Range/${start}-${end}`)
      .pipe(
        //Catch error, if error retry 3 times before error
        retry(3),
        catchError(this.handleError)
      );
  }

  // Get a specific movie
  getMovieSpecific(id: number): Observable<Movie> {
    return this.http.get<Movie>(baseUrl + `Movies/${id}`).pipe(
      //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
    );
  }

  // Get 20 random movies
  getMoviesRandom(): Observable<Movie[]> {
    return this.http.get<Movie[]>(baseUrl + `Movies/Random`).pipe(
      //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
    );
  }

  // Get n amount of random movies
  getMoviesRandomAmount(amount: number): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(baseUrl + `Movies/Random/${amount}`)
      .pipe(
        //Catch error, if error retry 3 times before error
        retry(3),
        catchError(this.handleError)
      );
  }

  getMoviesAiring(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(baseUrl + `Movies/Airing`)
      .pipe(
        //Catch error, if error retry 3 times before error
        retry(3),
        catchError(this.handleError)
      );
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(baseUrl + `Movies`, movie).pipe(
      //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
    );
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(baseUrl + `Customers`).pipe(
      //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
    );
  }

  // Get a specific movie
  getCustomersSpecific(id: number): Observable<Customer> {
    return this.http.get<Customer>(baseUrl + `Customers/${id}`).pipe(
      //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
    );
  }


  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(baseUrl + `Customers/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    )}
  postCustomer(body: Customer): Observable<Customer> {
    return this.http
      .post<Customer>(baseUrl + `Customers`, body, httpOptions);
  }


  getScreenings(): Observable<Screening[]> {
    return this.http.get<Screening[]>(baseUrl + `Screenings`).pipe(
      //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
    );
  }

  getScreeningsById(id: number): Observable<Screening> {
    return this.http.get<Screening>(baseUrl + `Screenings/${id}`).pipe(
      //Catch error, if error retry 3 times before error
      retry(3),
      catchError(this.handleError)
    );
  }

  getScreeningsByMovieId(id: number): Observable<Screening[]> {
    return this.http.get<Screening[]>(baseUrl + `Screenings/Movie/${id}`)
      .pipe(
        //Catch error, if error retry 3 times before error
        retry(3),
        catchError(this.handleError)
      );
  }

  getBookingsByCustomerId(id: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(baseUrl + `bookings/Customer/${id}`)
      .pipe(
        //Catch error, if error retry 3 times before error
        retry(3),
        catchError(this.handleError)
      );
  }

  getAutoComplete(type: string): Observable<AutoComplete[]> {
    return this.http.get<AutoComplete[]>(baseUrl + `AutoComplete/${type}`)
      .pipe(
        //Catch error, if error retry 3 times before error
        retry(3),
        catchError(this.handleError)
      );
  }

  postBooking(body: Booking): Observable<Booking> {
    return this.http
      .post<Booking>(baseUrl + `bookings`, body, httpOptions);
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
