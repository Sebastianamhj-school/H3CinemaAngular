import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { ThemeService } from '../../services/theme.service';
import { APIService } from 'src/app/services/api.service';
import { Customer } from 'src/Models/Customer';
import { Router } from '@angular/router';
import { Booking } from 'src/Models/Booking';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor
    (
      private tokenService: TokenStorageService,
      private themeService: ThemeService,
      private api: APIService,
      private route: Router
    ) { }

  customerInformation: Customer;
  bookings: Booking[];
  tickets: boolean;

  ngOnInit(): void {
    
    var temp = this.tokenService.decodeToken();

    this.api.getCustomerById(temp.CustomerId).subscribe(DataApi => {
      this.customerInformation = DataApi;
    });

    this.api.getBookingsByCustomerId(temp.CustomerId).subscribe(DataApi => {
      this.bookings = DataApi;
    });
  }

  getTheme() {
    return this.themeService.isDarkMode;
  }

  signOut() {
    this.tokenService.signOut();
    this.route.navigate(['/front-page']);
  }
}
