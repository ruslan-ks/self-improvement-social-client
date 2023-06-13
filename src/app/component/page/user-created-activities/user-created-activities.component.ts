import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { User } from "../../../interface/user";
import { Activity } from "../../../interface/activity";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../service/user.service";
import { map, tap } from "rxjs/operators";
import { EntityPageRequest } from "../../../dto/request/page/entity-page-request";
import { FilterCriteria } from "../../../dto/request/fitler/filter-criteria";
import { FilterOperator } from "../../../dto/request/fitler/filter-operator";
import { ActivityService } from "../../../service/activity.service";

@Component({
  selector: 'app-user-created-activities',
  templateUrl: './user-created-activities.component.html',
  styleUrls: ['./user-created-activities.component.css']
})
export class UserCreatedActivitiesComponent {
  pageRequest: EntityPageRequest = { page: 0, size: 6, sortBy: 'name', sortDirection: 'ASC' };
  filterCriteria: FilterCriteria;
  userId: number;
  user$: Observable<User>;
  activities$: Observable<Activity[]>;
  pageCount: number;

  constructor(private activatedRoute: ActivatedRoute,
              private activityService: ActivityService,
              private userService: UserService) {}

  ngOnInit() {
    this.userId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.filterCriteria = new FilterCriteria('author', FilterOperator.EQUAL, this.userId);
    this.user$ = this.userService.getById$(this.userId);
    this.loadPage();
  }

  loadPage() {
    this.activities$ = this.activityService.page$(this.pageRequest, [this.filterCriteria])
      .pipe(
        tap(response => this.pageCount = Math.ceil(response.count / response.size)),
        map(response => response.activities)
      );
  }

  handlePageChange(pageNumber: number) {
    this.pageRequest.page = pageNumber - 1;
    this.loadPage();
  }
}
