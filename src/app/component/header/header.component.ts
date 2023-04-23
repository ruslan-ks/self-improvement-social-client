import { Component } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { UserLoginState } from "../../enum/user-login-state";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean;

  constructor(private authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn();
    authService.loginStateChangeSubject
      .subscribe(loginState => this.isLoggedIn = loginState === UserLoginState.LOGGED_IN);
  }

  onLogOutClick() {
    this.authService.logOut();
    this.isLoggedIn = false;
  }
}
