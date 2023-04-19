import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ResponseBody } from "../interface/response-body";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { User } from "../interface/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl: string = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {
  }

  users$ = <Observable<ResponseBody>>this.http.get<ResponseBody>(this.apiUrl)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  save$ = (user: User) => <Observable<ResponseBody>>this.http.post(this.apiUrl, user)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(`Error: ${error}`);
    return throwError(() => `An error occurred: ${error}`);
  }

}
