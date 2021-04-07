import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MoviePosterComponent } from './Components/movie-poster/movie-poster.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { BookingSeatComponent } from './Components/booking-seat/booking-seat.component';
import { MovieTimeComponent } from './Components/movie-time/movie-time.component';
import { DatePipe } from '@angular/common';
import { ScreeningComponent } from './pages/screening/screening.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { DialogComponent } from './Components/dialog/dialog.component';
import { AdminComponent } from './pages/admin/admin.component';
import { TicketComponent } from './Components/ticket/ticket.component';
import { ComboBoxComponent } from './Components/combo-box/combo-box.component';
import { CreateBoxComponent } from './Components/create-box/create-box.component';
import { DynamicFormComponent } from './Components/dynamic-form/dynamic-form.component';


@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    LoginComponent,
    SignUpComponent,
    MoviePosterComponent,
    MovieDetailsComponent,
    BookingSeatComponent,
    MovieTimeComponent,
    ScreeningComponent,
    ProfileComponent,
    DialogComponent,
    AdminComponent,
    TicketComponent,
    ComboBoxComponent,
    CreateBoxComponent,
    DynamicFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    [authInterceptorProviders],
    DatePipe

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
