import { Component, OnInit } from '@angular/core';
import { ActivityService } from "../../service/activity.service";
import { EntityPageRequest } from "../../dto/request/page/entity-page-request";
import { FilterCriteria } from "../../dto/request/fitler/filter-criteria";
import { FilterOperation } from "../../dto/request/fitler/filter-operation";
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

  constructor(private activityService: ActivityService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    const pageRequest = new EntityPageRequest(0, 20, 'name', 'ASC');
    const filterCriteriaList = [new FilterCriteria('name', FilterOperation.LIKE, 'ING')];
    // this.activityService.page$(pageRequest, filterCriteriaList)
    //   .subscribe((pageResponse: ActivityPageResponse) => console.log(pageResponse));
    this.activities$ = this.activityService.page$(pageRequest, filterCriteriaList)
      .pipe(
        map(response => response.activities)
      );
    this.count$ = this.activityService.page$(pageRequest, filterCriteriaList)
      .pipe(
        map(response => response.count)
      );
    this.categories$ = this.categoryService.getAll$();
  }

  onPageChange(event: any) {

  }
}
