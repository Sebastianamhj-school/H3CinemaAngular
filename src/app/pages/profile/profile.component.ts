import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { ThemeService } from '../../services/theme.service';
import { APIService } from 'src/app/services/api.service';
import { Customer } from 'src/Models/Customer';
import { Router } from '@angular/router';

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
  tickets: boolean;

  ngOnInit(): void {
    
    console.log(this.tokenService.decodeToken());
    var temp = this.tokenService.decodeToken();
    console.log(temp.CustomerId);
    this.api.getCustomerById(temp.CustomerId).subscribe(DataApi => {
      this.customerInformation = DataApi;
      console.log(this.customerInformation);
    })
  }

  getTheme() {
    return this.themeService.isDarkMode;
  }

  signOut() {
    this.tokenService.signOut();
    this.route.navigate(['/front-page']);
  }
}
