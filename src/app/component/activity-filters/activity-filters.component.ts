import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from "rxjs";
import { Category } from "../../interface/category";
import { CategoryService } from "../../service/category.service";
import { FilterCriteria } from "../../dto/request/fitler/filter-criteria";
import { shareReplay, tap } from "rxjs/operators";
import { FormControl, FormGroup } from "@angular/forms";
import { FilterOperator } from "../../dto/request/fitler/filter-operator";

@Component({
  selector: 'app-activity-filters',
  templateUrl: './activity-filters.component.html',
  styleUrls: ['./activity-filters.component.css']
})
export class ActivityFiltersComponent implements OnInit {
  @Output() onSearchClick: EventEmitter<FilterCriteria[]> = new EventEmitter<FilterCriteria[]>();

  categories$: Observable<Category[]>;

  filtersForm: FormGroup = new FormGroup({
    search: new FormControl(''),
    minutesRequiredOperator: new FormControl(FilterOperator.LESS_EQUAL),
    minutesRequired: new FormControl(''),
    categories: new FormGroup({})
  });

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll$()
      .pipe(
        tap(categories => {
          for (let category of categories) {
            (<FormGroup> this.filtersForm.get('categories')).addControl('' + category.id, new FormControl());
          }
        }),
        shareReplay()
      );
  }

  onSubmit() {
    // console.log(this.filtersForm);

    const criteriaList = [];

    // Build search criteria
    const search = this.filtersForm.value['search'];
    if (search) {
      criteriaList.push(new FilterCriteria('name', FilterOperator.LIKE, search));
    }

    // Build minutes criteria
    const operator = this.filtersForm.value['minutesRequiredOperator'];
    const minutesRequired = this.filtersForm.value['minutesRequired'];
    if (operator && minutesRequired) {
      criteriaList.push(new FilterCriteria('minutesRequired', operator, minutesRequired));
    }

    // Build categories criteria items
    const categories = this.filtersForm.value['categories'];
    for (let id in this.filtersForm.value['categories']) {
      if (categories[id]) {
        criteriaList.push(new FilterCriteria('categories', FilterOperator.CONTAINS, id));
      }
    }

    this.onSearchClick.emit(criteriaList);
  }

  get filterOperator(): typeof FilterOperator {
    return FilterOperator;
  }
}
