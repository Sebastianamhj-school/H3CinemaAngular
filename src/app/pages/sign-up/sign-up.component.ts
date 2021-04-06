import { APIService } from 'src/app/services/api.service';
import { Customer } from './../../../Models/Customer';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemeService } from 'src/app/services/theme.service';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  isDarkMode: boolean;
  signedUp: boolean;
  customer: Customer;
  user:User;

  formUser = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl()
  });

  formCustomer = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    address: new FormControl(),
    postcode: new FormControl(),
    phoneNumber: new FormControl(),
    email: new FormControl()
  });

  constructor(private themeService: ThemeService, private api: APIService) { }

  ngOnInit(): void {
    this.signedUp = false;
    this.isDarkMode = this.themeService.isDarkMode;
    this.themeService.themeStateChange.subscribe(value => {
      this.isDarkMode = value;
    })
  }

  alertOnSend() {
    var passMatch = false;
    if (this.formUser.get("password") == this.formUser.get("confirmPassword")) {
      passMatch = true;
    }
    alert(this.formUser.get("email").valid + " " +
          this.formUser.get("password").valid + " " +
          this.formUser.get("confirmPassword").valid + " " +
          passMatch);
  }

  //Check if username exist

  async postCustomerTest(): Promise<Customer>
  {
    let convCustomer: Customer = this.formCustomer.value as Customer;
    // let response = this.api.postCustomerSync(convCustomer).toPromise;
    return this.api.postCustomerSync(convCustomer).then();
  }

  createCustomer(): Customer {
    let convCustomer: Customer = this.formCustomer.value as Customer;

    console.log(convCustomer);

    let customerpost: Customer;

    this.api.postCustomer(convCustomer).subscribe(dataAPI => {
      customerpost = dataAPI;
    });

    //let stuff = await this.api.postCustomer(convCustomer)

    return customerpost;
  }

  createUser(){
    let convUser: User = this.formUser.value as User;

    console.log(convUser);

    let asd = this.createCustomer();

    this.user.customerId = asd.Id;

    this.api.postUser(convUser).subscribe(dataApi => {
      this.user = dataApi;
    });
  }

  signUp()
  {
    console.log(this.postCustomerTest());
    //this.createCustomer();
    //this.createUser();
  }

}
