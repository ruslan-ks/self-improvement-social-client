import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { User } from "../../../interface/user";
import { Observable } from "rxjs";
import { UserService } from "../../../service/user.service";
import { UserActivity } from "../../../interface/user-activity";
import { UserActivityService } from "../../../service/user-activity.service";
import { PageRequest } from "../../../dto/request/page/page-request";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: number;
  user$: Observable<User>;
  userActivities$: Observable<UserActivity[]>;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private userActivityService: UserActivityService) {}

  ngOnInit(): void {
    this.userId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.user$ = this.userService.getById$(this.userId);
    this.userActivities$ = this.userActivityService.getPage$(this.userId, PageRequest.getDefault());
  }
}
