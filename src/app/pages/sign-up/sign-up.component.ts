import { APIService } from 'src/app/services/api.service';
import { Customer } from './../../../Models/Customer';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
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

  formcheck: boolean;

  usernameInput: Subject<string> = new Subject();

  formUser = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
  });

  formCustomer = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    address: new FormControl(),
    postcode: new FormControl(),
    phoneNumber: new FormControl(),
    email: new FormControl(),
  });

  constructor(private themeService: ThemeService, private api: APIService) {}


  ngOnInit(): void {
    this.formcheck = false;
    this.isDarkMode = this.themeService.isDarkMode;
    this.themeService.themeStateChange.subscribe((value) => {
    this.isDarkMode = value;


    // this.usernameControl.valueChanges.pipe(

    //   distinctUntilChanged()
    // ).subscribe(value => {
    //   console.log(value);
    //   this.api.checkUserName(value).subscribe(data => {
    //     this.userTaken = data;
    //     console.log(value);
    //     console.log(this.userTaken);
    //   });
    // })

    this.usernameInput.pipe(debounceTime(500),distinctUntilChanged())
    .subscribe(data => {
      console.log(data);
      this.api.checkUserName(data)
      .subscribe(api => {
        this.userTaken = api;
        console.log(this.userTaken);
      });
    })

    });
  }

  test1(event){
    this.usernameInput.next(event);

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
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  submitForm() {
    //CheckUserExist and checkpassword and make the form valid :)
    //THANKS SEBASTIAN? XD
    let check = this.checkUserExist();
    this.formcheck = this.checkPassword();
  }

  checkPassword(): boolean {
    let result: boolean = false;
    if (this.formUser.get('password').value == this.formUser.get('confirmPassword').value && this.formUser.get('password').value != null)
    {
      result = true;
    }
    console.log(result);
    return result;
  }







}
