import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MovieComponent } from './Components/movie/movie.component';
import { MoviePosterComponent } from './Components/movie-poster/movie-poster.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { BookingSeatComponent } from './Components/booking-seat/booking-seat.component';
import { MovieTimeComponent } from './Components/movie-time/movie-time.component';
import { DatePipe } from '@angular/common';
import { ScreeningComponent } from './pages/screening/screening.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    LoginComponent,
    SignUpComponent,
    MovieComponent,
    MoviePosterComponent,
    MovieDetailsComponent,
    BookingSeatComponent,
    MovieTimeComponent,
    ScreeningComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
