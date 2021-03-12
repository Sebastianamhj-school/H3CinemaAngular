import { Customer } from './../../Models/Customer';
import { Movie } from './../../Models/Movie';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class APIService {

  baseUrl:string = "https://localhost:44339/api";

  getbookingUrl:string = this.baseUrl + "/Bookings";
  getcustomersUrl:string = this.baseUrl + "/Customers";
  getmoviesUrl:string = this.baseUrl + "/Movies";
  getmoviesRandomUrl:string = this.getmoviesUrl + "/Random";


  constructor(private http:HttpClient) {}

  getMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.getmoviesUrl);
  }

  getMoviesRandom():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.getmoviesRandomUrl);
  }

  getMoviesRandomAmount(amount:number):Observable<Movie[]>{
    return this.http.get<Movie[]>(this.getmoviesRandomUrl + "/" + amount);
  }

  getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.getcustomersUrl);
  }

}
