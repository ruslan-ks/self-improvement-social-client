import { Component, Input, OnInit } from '@angular/core';
import { Activity } from "../../interface/activity";
import { CategoryService } from "../../service/category.service";
import { Observable } from "rxjs";
import { Category } from "../../interface/category";

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.css']
})
export class ActivityCardComponent implements OnInit {
  @Input({required: true}) activity!: Activity;

  categories$!: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategoriesById$(this.activity.categoryIds);
  }
}
