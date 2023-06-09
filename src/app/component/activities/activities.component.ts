import { Component, OnInit } from '@angular/core';
import { ActivityService } from "../../service/activity.service";
import { EntityPageRequest } from "../../dto/request/page/entity-page-request";
import { FilterCriteria } from "../../dto/request/fitler/filter-criteria";
import { Observable } from "rxjs";
import { Activity } from "../../interface/activity";
import { map } from "rxjs/operators";
import { Category } from "../../interface/category";
import { CategoryService } from "../../service/category.service";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  activities$!: Observable<Activity[]>;
  categories$!: Observable<Category[]>;
  count$!: Observable<number>;

  private pageRequest = new EntityPageRequest(0, 20, 'name', 'ASC');
  private filterCriteriaList: FilterCriteria[] = []; //[new FilterCriteria('name', FilterOperation.LIKE, 'ING')];

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
    this.count$ = this.activityService.page$(this.pageRequest, this.filterCriteriaList)
      .pipe(
        map(response => response.count)
      );
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
