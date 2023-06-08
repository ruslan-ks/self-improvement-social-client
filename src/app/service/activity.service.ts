import { Injectable } from '@angular/core';
import { FilterCriteria } from "../dto/request/fitler/filter-criteria";
import { HttpClient } from "@angular/common/http";
import { GetParamsBuilder } from "./get-params-builder.service";
import { EntityPageRequest } from "../dto/request/page/entity-page-request";
import { AppSettings } from "../app-settings";
import { map, shareReplay } from "rxjs/operators";
import { ResponseBody } from "../dto/response/response-body";
import { ActivityPageResponse } from "../dto/response/page/activity-page-response";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient, private getParamsBuilder: GetParamsBuilder) {}

  page$ = (pageRequest: EntityPageRequest, filters: FilterCriteria[]): Observable<ActivityPageResponse> => {
    const urlParams = this.getParamsBuilder.build(filters, pageRequest);
    return this.http.get<ResponseBody>(AppSettings.API_URL + 'activities?' + urlParams)
      .pipe(
        map(this.extractActivityPageResponse),
        shareReplay()
      );
  }

  // Returns not only page records, but also additional data, including total items count, page size and number
  pageData$ = (pageRequest: EntityPageRequest, filters: FilterCriteria[]): Observable<Map<string, any>> => {
    const urlParams = this.getParamsBuilder.build(filters, pageRequest);
    return this.http.get<ResponseBody>(AppSettings.API_URL + 'activities?' + urlParams)
      .pipe(
        map(response => response.data),
        shareReplay()
      );
  }

  private extractActivityPageResponse(responseBody: ResponseBody): ActivityPageResponse {
    const data = <any> responseBody.data;
    return {
      page: data.page,
      size: data.size,
      count: data.count,
      activities: data.activities
    };
  }
}
