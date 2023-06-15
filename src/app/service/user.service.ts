import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ResponseBody } from "../dto/response/response-body";
import { BehaviorSubject, interval, Observable, throwError } from "rxjs";
import { catchError, shareReplay, map, tap } from "rxjs/operators";
import { AppSettings } from "../app-settings";
import { User } from "../interface/user";
import { EntityPageRequest } from "../dto/request/page/entity-page-request";
import { FilterCriteria } from "../dto/request/fitler/filter-criteria";
import { GetParamsBuilder } from "./get-params-builder.service";
import { PageRequest } from "../dto/request/page/page-request";

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  private readonly apiUrl: string = AppSettings.API_URL + 'users';

  // map<userId, followingIds>
  private userFollowingIdsMap: Map<number, number[]> = new Map<number, number[]>();
  private intervalFollowingIdsMapRefreshSubscription;

  constructor(private http: HttpClient,
              private getParamsBuilder: GetParamsBuilder) {}

  ngOnInit(): void {
    this.intervalFollowingIdsMapRefreshSubscription = interval(30000) // every 30 seconds
      .subscribe(this.refreshFollowingIdsMap.bind(this));
  }

  private refreshFollowingIdsMap() {
    this.userFollowingIdsMap.forEach((ids: number[], userId: number, map: Map<number, number[]>) =>
     this.followingIds$(userId)
       .subscribe(followingIds => map.set(userId, followingIds))
    );
  }

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
      map(response => response.data['user']),
      shareReplay()
    );

  followersCount$ = (userId: number): Observable<number> =>
    this.http.get<ResponseBody>(`${this.apiUrl}/${userId}/followers/count`)
      .pipe(
        map(response => response.data['followersCount']),
        shareReplay()
      );

  followersPage$ = (userId: number, pageRequest: PageRequest): Observable<User[]> => {
    const params = this.getParamsBuilder.pageRequestBuild(pageRequest);
    return this.http.get<ResponseBody>(`${this.apiUrl}/${userId}/followers?${params}`)
      .pipe(
        map(response => response.data['followers']),
        shareReplay()
      );
  }

  followingsCount$ = (userId: number): Observable<number> =>
    this.http.get<ResponseBody>(`${this.apiUrl}/${userId}/followings/count`)
      .pipe(
        map(response => response.data['followingsCount']),
        shareReplay()
      );

  followingsPage$ = (userId: number, pageRequest: PageRequest): Observable<User[]> => {
    const params = this.getParamsBuilder.pageRequestBuild(pageRequest);
    return this.http.get<ResponseBody>(`${this.apiUrl}/${userId}/followings?${params}`)
      .pipe(
        map(response => response.data['followings']),
        shareReplay()
      );
  }

  followingIds$ = (userId: number): Observable<number[]> => {
    const found = this.userFollowingIdsMap.get(userId);
    if (found) {
      return new BehaviorSubject<number[]>(found);
    }
    return this.http.get<ResponseBody>(`${this.apiUrl}/${userId}/following-ids`)
      .pipe(
        map(response => response.data['followingIds']),
        tap(followingIds => this.userFollowingIdsMap.set(userId, followingIds)),
        shareReplay()
      );
  }

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
