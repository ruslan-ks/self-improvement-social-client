import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserActivityService } from "../../service/user-activity.service";
import { Observable } from "rxjs";
import { Activity } from "../../interface/activity";
import { PageRequest } from "../../dto/request/page/page-request";
import { User } from "../../interface/user";
import { UserService } from "../../service/user.service";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-user-activities-page',
  templateUrl: './user-activities-page.component.html',
  styleUrls: ['./user-activities-page.component.css']
})
export class UserActivitiesPageComponent implements OnInit {
  pageRequest: PageRequest = { page: 0, size: 6, sort: []};
  userId: number;
  user$: Observable<User>;
  activities$: Observable<Activity[]>;
  count: number;

  constructor(private activatedRoute: ActivatedRoute,
              private userActivityService: UserActivityService,
              private userService: UserService) {}

  ngOnInit() {
    this.userId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.loadPage();

    // There are no filters, thus no need to request count more than once
    this.userActivityService.count$(this.userId)
      .subscribe(count => this.count = count);
  }

  loadPage() {
    this.user$ = this.userService.getById$(this.userId);
    this.activities$ = this.userActivityService.getPage$(this.userId, this.pageRequest)
      .pipe(
        map(userActivities => userActivities.map(ua => ua.activity))
      );
  }

  handlePageChange(pageNumber: number) {
    this.pageRequest.page = pageNumber - 1;
    this.loadPage();
  }
}
