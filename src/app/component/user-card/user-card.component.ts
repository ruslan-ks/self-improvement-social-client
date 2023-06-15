import { Component, Input } from '@angular/core';
import { User } from "../../interface/user";
import { Observable } from "rxjs";
import { UserActivity } from "../../interface/user-activity";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../service/user.service";
import { UserActivityService } from "../../service/user-activity.service";
import { ActivityService } from "../../service/activity.service";
import { PageRequest } from "../../dto/request/page/page-request";
import { FilterCriteria } from "../../dto/request/fitler/filter-criteria";
import { FilterOperator } from "../../dto/request/fitler/filter-operator";
import { EntityPageRequest } from "../../dto/request/page/entity-page-request";
import { map } from "rxjs/operators";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input({ required: true }) user: User | null = null;

  userActivities$: Observable<UserActivity[]>;
  userActivityCount$: Observable<number>;
  createdActivitiesCount$: Observable<number>;
  followersCount$: Observable<number>;
  followingsCount: number;

  isFollowedByLoggedUser: boolean;
  loggedUserId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private userActivityService: UserActivityService,
              private activityService: ActivityService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.userActivities$ = this.userActivityService.getPage$(this.user.id, PageRequest.getDefault());
    this.userActivityCount$ = this.userActivityService.count$(this.user.id);

    const filterCriteria = new FilterCriteria("author", FilterOperator.EQUAL, this.user.id);
    this.createdActivitiesCount$ = this.activityService.page$(EntityPageRequest.getDefault(), [filterCriteria])
      .pipe(
        map(dataMap => dataMap.count)
      );

    this.followersCount$ = this.userService.followersCount$(this.user.id);
    this.loadFollowingsCount();

    this.loggedUserId = this.authService.getLoggedUserId();
    this.loadFollowingIds();
  }

  private loadFollowingsCount() {
    this.userService.followingsCount$(this.user.id)
      .subscribe(count => this.followingsCount = count);
  }

  // Requires this.loggedUserId initialization before calling
  private loadFollowingIds() {
    if (this.loggedUserId && !this.isLoggedUser()) {
      console.log('Subscribing to followingIds$');
      this.userService.followingIds$(this.loggedUserId)
        .subscribe(followingIds => this.isFollowedByLoggedUser = followingIds.includes(this.user.id));
    }
  }

  getAvatarUrl(user: User | null): string {
    return `http://localhost:8080/users/${user?.id}/avatar`;
  }

  isLoggedUser() {
    return this.loggedUserId && this.loggedUserId === this.user.id;
  }

  handleFollowClick() {
    this.userService.addFollowing$(this.user.id)
      .subscribe(() => {
        this.isFollowedByLoggedUser = true;
      });
  }

  handleUnfollowClick() {
    this.userService.deleteFollowing$(this.user.id)
      .subscribe(() => {
        this.isFollowedByLoggedUser = false;
      });
  }
}
