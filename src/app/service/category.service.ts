import { Injectable, OnInit } from '@angular/core';
import { Category } from "../interface/category";
import { HttpClient } from "@angular/common/http";
import { AppSettings } from "../app-settings";
import { ResponseBody } from "../dto/response/response-body";
import { interval, Observable, of, Subscription } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import { NoSuchElementError } from "../error/no-such-element-error";

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnInit {
  private categories: Category[] | null = null; // all categories

  private intervalCategoriesReloadSubscription!: Subscription;

  constructor(private http: HttpClient) { }

  getAll$ = (): Observable<Category[]> => {
    if (this.categories) {
      return of(this.categories);
    }
    return this.http.get<ResponseBody>(AppSettings.API_URL + 'categories')
      .pipe(
        map(response => (<any> response.data).categories),
        tap(categories => this.categories = categories),
        shareReplay()
      );
  }

  ngOnInit(): void {
    this.intervalCategoriesReloadSubscription = interval(30000) // fires every 30 seconds
      .subscribe(this.reloadCategories.bind(this));
  }

  reloadCategories(): void {
    this.http.get<ResponseBody>(AppSettings.API_URL + 'categories')
      .subscribe(response => this.categories = (<any> response.data).categories);
  }

  getById$ = (categoryId: number): Observable<Category> => this.getAll$()
    .pipe(
      map(this.getCategoryByIdOrElseThrow(categoryId))
    );

  getCategoriesById$ = (categoryIds: number[]): Observable<Category[]> => this.getAll$()
    .pipe(
      map(categories => categories.filter(c => categoryIds.includes(c.id)))
    );

  private getCategoryByIdOrElseThrow(categoryId: number) {
    return (categories: Category[]) => {
      const found = categories.find(c => c.id === categoryId);
      if (!found) {
        throw new NoSuchElementError('Cannot find category bi id ' + categoryId);
      }
      return found;
    }
  }
}
