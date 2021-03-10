import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() loginClose = new EventEmitter<boolean>();

  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
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
