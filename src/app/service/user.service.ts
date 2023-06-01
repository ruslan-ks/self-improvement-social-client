import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ResponseBody } from "../dto/response/response-body";
import { Observable, throwError } from "rxjs";
import { catchError, shareReplay, tap, map } from "rxjs/operators";
import { ShortUserData } from "../dto/response/short-user-data";
import { PageRequest } from "../dto/request/page/page-request";
import { AppSettings } from "../app-settings";
import { User } from "../interface/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl: string = AppSettings.API_URL + 'users';

  constructor(private http: HttpClient) {}

  page$ = (pr: PageRequest): Observable<ShortUserData[]> => {
    const sortParams = pr.sort
      .map(value => 'sort=' + value)
      .join('&');
    const urlWithParams = `${this.apiUrl}?page=${pr.page}&size=${pr.size}&${sortParams}`;
    return this.http.get<ResponseBody>(urlWithParams)
      .pipe(
        map(this.extractUsersArray),
        catchError(this.handleError),
        shareReplay()
      );
  }

  private extractUsersArray(response: ResponseBody): ShortUserData[] {
    console.log('Obtained users:', (<any> response.data).users);
    return (<any> response.data).users;
  }

  count$: Observable<number> = this.http.get<ResponseBody>(this.apiUrl + '/count')
    .pipe(
      map(this.extractCount),
      tap(this.logCount),
      catchError(this.handleError),
      shareReplay()
    );

  private extractCount(response: ResponseBody): number {
    return (<any> response.data).count;
  }

  private logCount(count: number): void {
    console.log('Obtained users count:', count);
  }

  getById$ = (userId: number): Observable<User> => this.http.get<ResponseBody>(`${this.apiUrl}/${userId}`)
    .pipe(
      map(response => (<any> response.data).user),
      shareReplay()
    );

  // save$ = (user: User) => <Observable<ResponseBody>>this.http.post(this.apiUrl, user)
  //   .pipe(
  //     tap(console.log),
  //     catchError(this.handleError)
  //   );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(`Error: ${error}`);
    return throwError(() => `An error occurred in UserService: ${error}`);
  }

}
