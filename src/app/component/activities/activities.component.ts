import { Component, OnInit } from '@angular/core';
import { ActivityService } from "../../service/activity.service";
import { EntityPageRequest } from "../../dto/request/page/entity-page-request";
import { FilterCriteria } from "../../dto/request/fitler/filter-criteria";
import { FilterOperation } from "../../dto/request/fitler/filter-operation";
import { ActivityPageResponse } from "../../dto/response/page/activity-page-response";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    const pageRequest = new EntityPageRequest(0, 20, 'name', 'ASC');
    const filterCriteriaList = [new FilterCriteria('name', FilterOperation.LIKE, 'ING')];
    this.activityService.page$(pageRequest, filterCriteriaList)
      .subscribe((pageResponse: ActivityPageResponse) => console.log(pageResponse));
  }

}
