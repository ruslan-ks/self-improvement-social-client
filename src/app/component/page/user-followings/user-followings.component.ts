import { Component } from '@angular/core';
import { PageRequest } from "../../../dto/request/page/page-request";
import { Observable } from "rxjs";
import { User } from "../../../interface/user";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../service/user.service";

@Component({
  selector: 'app-user-followings',
  templateUrl: './user-followings.component.html',
  styleUrls: ['./user-followings.component.css']
})
export class UserFollowingsComponent {
  pageRequest: PageRequest = { page: 0, size: 6, sort: []};
  userId: number;
  user$: Observable<User>;
  followings$: Observable<User[]>;
  pageCount: number;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) {}

  ngOnInit() {
    this.userId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.loadPage();
    this.userService.followersCount$(this.userId)
      .subscribe(count => this.pageCount = Math.ceil(count / this.pageRequest.size));
  }

  loadPage() {
    this.user$ = this.userService.getById$(this.userId);
    this.followings$ = this.userService.followingsPage$(this.userId, this.pageRequest);
  }

  handlePageChange(pageNumber: number) {
    this.pageRequest.page = pageNumber - 1;
    this.loadPage();
  }
}
