import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { Customer } from './../../../Models/Customer';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, Validators, FormControl, FormGroup, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from 'src/app/services/theme.service';
import { User } from 'src/Models/User';
import { Observable, of, timer, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  isDarkMode: boolean;

  customer: Customer;
  user: User;
  userTaken: boolean;
  passwordMatch: boolean;
  formcheck: boolean;


  usernameInput: Subject<string> = new Subject();

  formUser = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
  });

  formCustomer = new FormGroup({
    firstname: new FormControl('', [Validators.maxLength(100)]),
    lastname: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    postcode: new FormControl('', [Validators.pattern('[0-9]{4}$')]),
    phoneNumber: new FormControl('', [Validators.pattern('[0-9]{8}$')]),
    email: new FormControl('', [Validators.email]),
  });

  constructor(private router: Router, private themeService: ThemeService, private api: APIService) {}


  ngOnInit(): void {
    this.formcheck = false;
    this.isDarkMode = this.themeService.isDarkMode;
    this.themeService.themeStateChange.subscribe((value) => {
    this.isDarkMode = value;
    });
    this.passwordMatch = this.checkPassword();

    this.usernameInput.pipe(debounceTime(500), distinctUntilChanged()).subscribe(data => {
      this.api.checkUserName(data).subscribe(value => {
        this.userTaken = value;
      })
    })

  }

  userEvent(event){
    this.usernameInput.next(event);
  }

  firstnameValidation(): boolean {
    let result: boolean = false;
    if (this.formCustomer.get('firstname').valid){
      result = true;
    }
    return result;
  }

  lastnameValidation(): boolean {
    let result: boolean = false;
    if (this.formCustomer.get('lastname').valid ){
      result = true;
    }
    return result;
  }

  addressValidation(): boolean {
    let result: boolean = false;
    if (this.formCustomer.get('address').valid ){
      result = true;
    }
    return result;
  }

  postcodeValidation(): boolean {
    let result: boolean = false;
    if (this.formCustomer.get('postcode').valid){
      result = true;
    }
    return result;
  }

  phoneNumberValidation(): boolean {
    let result: boolean = false;
    if (this.formCustomer.get('phoneNumber').valid ){
      result = true;
    }
    return result;
  }

  emailValidation(): boolean {
    let result: boolean = false;
    if (this.formCustomer.get('email').valid ){
      result = true;
    }
    return result;
  }


  customerValidation(): boolean {
    let result: boolean = false;
    if (this.firstnameValidation() &&
        this.lastnameValidation() &&
        this.addressValidation() &&
        this.postcodeValidation() &&
        this.phoneNumberValidation() &&
        this.emailValidation()
        )
          {
            result = true;
          }
    else
    {
      console.log("error validation");
    }

    return result;
}

  checkUserExist(): boolean
  {
    let result:boolean;
    this.api.checkUserName(this.formUser.get('username').value)
    .subscribe(dataAPI => {
     result = dataAPI;
    })

    return result;
  }

  signUp() {
    let convCustomer: Customer = this.formCustomer.value as Customer;
    let convUser: User = this.formUser.value as User;

    let result;

    this.api
      .postCustomer(convCustomer)
      .toPromise()
      .then((data) => {
        convUser.customerId = data.id;
        this.api.postUser(convUser).subscribe((dataAPI) => {
          result = dataAPI;
          alert("Sign up successful! \nSign in to complete activation");
        });
      })
      .catch((error) => {
        alert(error);
      });
      this.router.navigate(['front-page']);
  }

  submitForm() {
    this.formcheck = false;

    if (this.userTaken == false && this.checkPassword() == true) {
      this.formcheck = true;
    }

  }

  formcheckM(): boolean {
    let result: boolean = false;
    if (this.userTaken == false && this.checkPassword() == true &&
      this.formUser.get('username').dirty &&
      this.formUser.get('password').dirty &&
      this.formUser.get('confirmPassword').dirty) {
        result = true;
    }
    return result;
  }


  checkPassword(): boolean {
    let result: boolean = false;
    if (this.formUser.get('password').value == this.formUser.get('confirmPassword').value)
    {
      result = true;
    }
    return result;
  }







}
