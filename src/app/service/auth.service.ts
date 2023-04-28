import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserLoginRequest } from "../interface/user-login-request";
import { ResponseBody } from "../interface/response-body";
import { shareReplay, tap } from "rxjs/operators";
import * as moment from "moment";
import { Moment } from "moment";
import { interval, Observable, Subject, Subscription } from "rxjs";
import { UserLoginState } from "../enum/user-login-state";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private loginApiUrl: string = 'http://localhost:8080/login';

  private idTokenName: string = 'idToken';
  private idTokenExpiresAtName: string = 'idTokenExpiresAt';

  private _loginStateChangeSubject: Subject<UserLoginState> = new Subject<UserLoginState>();

  private intervalExpirationCheckSubscription: Subscription;

  constructor(private http: HttpClient) {
    this._loginStateChangeSubject
      .subscribe(loginState => console.log('Login state changed:', loginState));

    this.intervalExpirationCheckSubscription = interval(30000) // fires every 30 seconds
      .subscribe(this.removeIdTokenIfExpired.bind(this));
  }

  private removeIdTokenIfExpired() {
    if (this.isExpired()) {
      this.removeIdToken();
      this.emitLoginStateChange(UserLoginState.LOGGED_OUT);
    }
  }

  private removeIdToken() {
    localStorage.removeItem(this.idTokenName);
    localStorage.removeItem(this.idTokenExpiresAtName);
  }

  ngOnDestroy() {
    this.intervalExpirationCheckSubscription.unsubscribe();
  }

  get loginStateChangeSubject() {
    return this._loginStateChangeSubject;
  }

  logIn(email: string, password: string): Observable<ResponseBody> {
    const loginRequest: UserLoginRequest = { email: email, password: password };
    return this.http.post<ResponseBody>(this.loginApiUrl, loginRequest)
      .pipe(
        tap((response) => this.setSession(response.data)),
        shareReplay()
      );
  }

  private setSession(authData: any): void {
    const expiresAt = moment(authData.expiresAt);

    localStorage.setItem(this.idTokenName, authData.idToken);
    localStorage.setItem(this.idTokenExpiresAtName, JSON.stringify(expiresAt.valueOf()));

    this.emitLoginStateChange(UserLoginState.LOGGED_IN);
  }

  logOut(): void {
    this.removeIdToken();
    this.emitLoginStateChange(UserLoginState.LOGGED_OUT);
  }

  private emitLoginStateChange(loginState: UserLoginState) {
    this._loginStateChangeSubject.next(loginState);
  }

  isLoggedIn(): boolean {
    // return moment().isBefore(this.getExpiration());
    return !this.isExpired();
  }

  private isExpired() {
    return moment().isSameOrAfter(this.getExpiration());
  }

  private getExpiration(): Moment {
    const expiration = localStorage.getItem(this.idTokenExpiresAtName);
    return moment(JSON.parse(expiration!));
  }

  getIdToken() {
    return localStorage.getItem(this.idTokenName);
  }
}
