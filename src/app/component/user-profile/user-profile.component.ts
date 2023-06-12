import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { User } from "../../interface/user";
import { Observable } from "rxjs";
import { UserService } from "../../service/user.service";
import { UserActivity } from "../../interface/user-activity";
import { UserActivityService } from "../../service/user-activity.service";
import { PageRequest } from "../../dto/request/page/page-request";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user$: Observable<User>;
  userActivities$: Observable<UserActivity[]>;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private userActivityService: UserActivityService,
              private authService: AuthService) {}

  ngOnInit(): void {
    const userId: number = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.user$ = this.userService.getById$(userId);
    this.userActivities$ = this.userActivityService.getPage$(userId, PageRequest.getDefault());
  }

  isNotLoggedUserId(userId: number) {
    const loggedUserId = this.authService.getLoggedUserId();
    return !(loggedUserId && loggedUserId === userId);
  }
}
