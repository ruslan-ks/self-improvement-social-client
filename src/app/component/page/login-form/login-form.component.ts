import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../../../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.authService.logIn(form.value.email, form.value.password)
      //.subscribe((response) => this.router.navigateByUrl('/'));
      .subscribe({
        next: this.handleAuthSuccess.bind(this),
        error: this.handleError.bind(this)
      })
  }

  private handleAuthSuccess() {
    this.router.navigateByUrl('/');
  }

  private handleError(error: any) {
    console.log(error);
    this.loginFailed = true;
  }
}
