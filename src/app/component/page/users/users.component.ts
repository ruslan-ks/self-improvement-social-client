import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../service/user.service";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { User } from "../../../interface/user";
import { FilterCriteria } from "../../../dto/request/fitler/filter-criteria";
import { EntityPageRequest } from "../../../dto/request/page/entity-page-request";
import { FilterOperator } from "../../../dto/request/fitler/filter-operator";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private pageRequest: EntityPageRequest = { page: 0, size: 10, sortBy: 'name', sortDirection: 'ASC' };
  private filterCriteriaList: FilterCriteria[];
  users$: Observable<User[]> = new Observable<User[]>();
  pageCount: number = 1;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    this.users$ = this.userService.page$(this.filterCriteriaList, this.pageRequest)
      .pipe(
        tap(dataMap => this.pageCount = Math.ceil(dataMap['count'] / this.pageRequest.size)),
        map(dataMap => dataMap['users'])
      );
  }

  onPageChange(pageNumber: number) {
    this.pageRequest.page = pageNumber - 1;
    this.loadPage();
  }

  handleSearchSubmit(searchQuery: string) {
    if (searchQuery) {
      this.filterCriteriaList = [new FilterCriteria('name', FilterOperator.LIKE, searchQuery)];
    } else {
      this.filterCriteriaList = [];
    }
    this.loadPage();
  }
}
