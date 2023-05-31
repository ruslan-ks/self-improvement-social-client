import { Component, OnInit } from '@angular/core';
import { ShortUserData } from "../../interface/short-user-data";
import { UserService } from "../../service/user.service";
import { PageRequest } from "../../service/data/page-request";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private pageRequest: PageRequest = { page: 0, size: 2, sort: [] };

  users$: Observable<ShortUserData[]> = new Observable<ShortUserData[]>();
  pageCount$: Observable<number> = new Observable<number>();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.pageCount$ = this.userService.count$
      .pipe(
        map(count => Math.ceil(count / this.pageRequest.size))
      );
    this.users$ = this.userService.page$(this.pageRequest);
  }

  onPageChange(pageNumber: number) {
    this.pageRequest.page = pageNumber - 1;
    console.log('UsersComponent: Page changed: ', pageNumber);
    this.users$ = this.userService.page$(this.pageRequest);
  }
}
