import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  isDarkMode: boolean;

  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl()
  });

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode;
    this.themeService.themeStateChange.subscribe(value => {
      this.isDarkMode = value;
    })
  }

  alertOnSend() {
    var passMatch = false;
    if (this.form.get("password") == this.form.get("confirmPassword")) {
      passMatch = true;
    }
    alert(this.form.get("email").valid + " " +
          this.form.get("password").valid + " " +
          this.form.get("confirmPassword").valid + " " +
          passMatch);
  }

}
