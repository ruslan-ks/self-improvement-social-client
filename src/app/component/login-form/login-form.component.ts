import { Component, EventEmitter, Output } from '@angular/core';
import { UserLoginRequest } from "../../interface/user-login-request";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  @Output() submitEventEmitter: EventEmitter<UserLoginRequest> = new EventEmitter<UserLoginRequest>();

  userEmail: string = '';
  userPassword: string = '';

  onSubmitButtonClick() {
    this.submitEventEmitter.emit({
      email: this.userEmail,
      password: this.userPassword
    });
  }
}
