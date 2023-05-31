import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from "rxjs";
import { Category } from "../../interface/category";
import { CategoryService } from "../../service/category.service";
import { FilterCriteria } from "../../dto/request/fitler/filter-criteria";

@Component({
  selector: 'app-activity-filters',
  templateUrl: './activity-filters.component.html',
  styleUrls: ['./activity-filters.component.css']
})
export class ActivityFiltersComponent implements OnInit {
  @Output() onSearchClick: EventEmitter<FilterCriteria[]> = new EventEmitter<FilterCriteria[]>();

  categories$!: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll$();
  }

  onSearchButtonClick() {
    this.onSearchClick.emit([]);
  }
}
