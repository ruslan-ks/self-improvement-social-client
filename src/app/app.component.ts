import { Component, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = "";

  displayLoadingSpinner: boolean = true;

  constructor(private router: Router, private translateService: TranslateService) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.displayLoadingSpinner = true;
      } else if (event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError) {
        this.displayLoadingSpinner = false;
      }
    });

    this.translateService.get(`self-improvement-social`)
      .subscribe(value => this.title = value);
  }
}
