import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ResponseBody } from "../dto/response/response-body";
import { Observable, throwError } from "rxjs";
import { catchError, shareReplay, map } from "rxjs/operators";
import { AppSettings } from "../app-settings";
import { User } from "../interface/user";
import { EntityPageRequest } from "../dto/request/page/entity-page-request";
import { FilterCriteria } from "../dto/request/fitler/filter-criteria";
import { GetParamsBuilder } from "./get-params-builder.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl: string = AppSettings.API_URL + 'users';

  constructor(private http: HttpClient,
              private getParamsBuilder: GetParamsBuilder) {}

  // Return not only list of items, but also any data received in response.data map
  page$ = (filterCriteriaList: FilterCriteria[], pageRequest: EntityPageRequest): Observable<Map<string, any>> => {
    const params = this.getParamsBuilder.build(filterCriteriaList, pageRequest);
    const urlWithParams = `${this.apiUrl}?${params}`;
    return this.http.get<ResponseBody>(urlWithParams)
      .pipe(
        map(response => response.data),
        catchError(this.handleError),
        shareReplay()
      );
  }

  getById$ = (userId: number): Observable<User> => this.http.get<ResponseBody>(`${this.apiUrl}/${userId}`)
    .pipe(
      map(response => (<any> response.data).user),
      shareReplay()
    );

  followersCount = (userId: number): Observable<number> =>
    this.http.get<ResponseBody>(`${this.apiUrl}/${userId}/followers/count`)
      .pipe(
        map(response => (<any> response.data).followersCount),
        shareReplay()
      );

  followingsCount = (userId: number): Observable<number> =>
    this.http.get<ResponseBody>(`${this.apiUrl}/${userId}/followings/count`)
      .pipe(
        map(response => (<any> response.data).followingsCount),
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
