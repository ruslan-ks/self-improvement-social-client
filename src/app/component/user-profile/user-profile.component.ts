import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { User } from "../../interface/user";
import { Observable } from "rxjs";
import { UserService } from "../../service/user.service";
import { UserActivity } from "../../interface/user-activity";
import { UserActivityService } from "../../service/user-activity.service";
import { PageRequest } from "../../dto/request/page/page-request";
import { ActivityService } from "../../service/activity.service";
import { EntityPageRequest } from "../../dto/request/page/entity-page-request";
import { FilterCriteria } from "../../dto/request/fitler/filter-criteria";
import { FilterOperator } from "../../dto/request/fitler/filter-operator";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user$!: Observable<User>;
  userActivities$!: Observable<UserActivity[]>;
  userActivityCount$!: Observable<number>;
  createdActivitiesCount$!: Observable<number>;
  followersCount$!: Observable<number>;
  followingsCount$!: Observable<number>;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private userActivityService: UserActivityService,
              private activityService: ActivityService) {}

  ngOnInit(): void {
    const userId: number = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.user$ = this.userService.getById$(userId);
    this.userActivities$ = this.userActivityService.getPage$(userId, PageRequest.getDefault());
    // this.userActivities$.subscribe(console.log);
    this.userActivityCount$ = this.userActivityService.count$(userId);

    const filterCriteria = new FilterCriteria("author", FilterOperator.EQUAL, userId);
    this.createdActivitiesCount$ = this.activityService.page$(EntityPageRequest.getDefault(), [filterCriteria])
      .pipe(
        map(map => map.count)
      );

    this.followersCount$ = this.userService.followersCount(userId);
    this.followingsCount$ = this.userService.followingsCount(userId);
  }

  getAvatarUrl(userId: number): string {
    return this.userService.getAvatarUrl(userId);
  }
}
