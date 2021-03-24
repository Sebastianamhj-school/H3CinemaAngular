import { TokenStorageService } from './../../services/token-storage.service';
import { APIService } from 'src/app/services/api.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() loginClose = new EventEmitter<boolean>();

  isDarkMode: boolean;
  token: User;

  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private api: APIService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode;
  }

  sendLoginClose() {
    this.loginClose.emit(false);
  }

  alertOnSend() {
    alert(
      this.form.get('email').value + ' ' + this.form.get('password').value + ' '
    );
  }

  login() {
    var username = this.form.get('username').value;
    var password = this.form.get('password').value;
    this.api.getToken(username, password).subscribe((dataAPI) => {
      this.token = dataAPI;
      this.tokenService.saveToken(this.token.token);
    });
  }

  forgotPassword() {
    this.router.navigate(['/', '']);
  }
}
