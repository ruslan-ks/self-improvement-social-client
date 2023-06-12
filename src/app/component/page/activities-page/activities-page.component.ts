import { Component, OnInit } from '@angular/core';
import { ActivityService } from "../../../service/activity.service";
import { EntityPageRequest } from "../../../dto/request/page/entity-page-request";
import { FilterCriteria } from "../../../dto/request/fitler/filter-criteria";
import { Observable } from "rxjs";
import { Activity } from "../../../interface/activity";
import { map } from "rxjs/operators";
import { Category } from "../../../interface/category";
import { CategoryService } from "../../../service/category.service";

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.css']
})
export class ActivitiesPageComponent implements OnInit {
  activities$: Observable<Activity[]>;
  categories$: Observable<Category[]>;
  pageCount: number;

  private pageRequest = new EntityPageRequest(0, 6, 'name', 'ASC');
  private filterCriteriaList: FilterCriteria[] = [];

  constructor(private activityService: ActivityService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadPage();
    this.categories$ = this.categoryService.getAll$();
  }

  loadPage(): void {
    this.activities$ = this.activityService.page$(this.pageRequest, this.filterCriteriaList)
      .pipe(
        map(response => response.activities)
      );
    this.activityService.page$(this.pageRequest, this.filterCriteriaList)
      .pipe(
        map(response => Math.ceil(response.count / this.pageRequest.size))
      )
      .subscribe(pageCount => this.pageCount = pageCount);
  }

  onPageChange(page: number) {
    this.pageRequest.page = page - 1;
    this.loadPage();
  }

  onFiltersChange(criteriaList: FilterCriteria[]) {
    this.filterCriteriaList = criteriaList;
    this.loadPage();
  }
}
