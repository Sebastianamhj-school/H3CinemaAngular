import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { ThemeService } from '../../services/theme.service';
import { APIService } from 'src/app/services/api.service';
import { Customer } from 'src/Models/Customer';

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
      private api: APIService
    ) { }

  customerInformation: Customer;

  ngOnInit(): void {
    
    console.log(this.tokenService.decodeToken());
    var temp = this.tokenService.decodeToken();
    console.log(temp.CustomerId);
    this.api.getCustomerById(temp.CustomerId).subscribe(DataApi => {
      this.customerInformation = DataApi;
    })
  }

  getTheme() {
    return this.themeService.isDarkMode;
  }
}
