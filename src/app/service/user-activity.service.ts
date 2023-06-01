import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PageRequest } from "../dto/request/page/page-request";
import { Observable } from "rxjs";
import { UserActivity } from "../interface/user-activity";
import { GetParamsBuilder } from "./get-params-builder.service";
import { AppSettings } from "../app-settings";
import { ResponseBody } from "../dto/response/response-body";
import { map, shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {

  constructor(private http: HttpClient, private getParamsBuilder: GetParamsBuilder) { }

  getPage$ = (userId: number, pageRequest: PageRequest): Observable<UserActivity[]> => {
    const params = this.getParamsBuilder.pageRequestBuild(pageRequest);
    return this.http.get<ResponseBody>(`${AppSettings.API_URL}users/${userId}/activities/completions?${params}`)
      .pipe(
        map(this.extractUserActivities),
        shareReplay()
      );
  }

  private extractUserActivities = (response: ResponseBody): UserActivity[] => (<any> response.data).userActivities;
}
