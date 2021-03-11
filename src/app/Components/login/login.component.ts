import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() loginClose = new EventEmitter<boolean>();

  isDarkMode: boolean;

  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private router: Router, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode;
  }

  sendLoginClose() {
    this.loginClose.emit(false);
  }

  alertOnSend() {
    alert(this.form.get("email").value + " " +
          this.form.get("password").value + " ");
  }

  forgotPassword() {
    this.router.navigate(['/', '']);
  }

}
