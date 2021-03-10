import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
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
