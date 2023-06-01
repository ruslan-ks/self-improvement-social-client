import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { UserActivity } from "../../interface/user-activity";

@Component({
  selector: 'app-user-activity-statistics',
  templateUrl: './user-activity-statistics.component.html',
  styleUrls: ['./user-activity-statistics.component.css']
})
export class UserActivityStatisticsComponent implements OnInit {

  @Input({required: true}) userActivities!: Observable<UserActivity[]>;

  constructor() {}

  ngOnInit() {
    this.userActivities.subscribe(userActivities => {
      userActivities.forEach(a => {
        let startedAt = new Date(a.startedAt * 1000);
        console.log(startedAt);
      })
    })
  }

}
