import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from './app.component';
import { LanguageSelectComponent } from './component/language-select/language-select.component';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from './component/header/header.component';
import { LoginFormComponent } from './component/page/login-form/login-form.component';
import { HomeComponent } from './component/page/home/home.component';
import { Error404Component } from './component/page/errors/error404/error404.component';
import { AppRoutingModule } from "./app-routing.module";
import { SpinnerComponent } from './component/spinner/spinner.component';
import { AuthInterceptor } from "./interceptor/auth-interceptor";
import { GlobalErrorHandler } from "./error/handler/global-error-handler";
import { UnknownErrorComponent } from './component/page/errors/unknown-error/unknown-error.component';
import { GlobalHttpErrorHandler } from "./interceptor/global-http-error-handler.interceptor";
import { UserCardComponent } from './component/user-card/user-card.component';
import { UsersComponent } from './component/page/users/users.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { ActivitiesPageComponent } from './component/page/activities-page/activities-page.component';
import { ActivityCardComponent } from './component/activity-card/activity-card.component';
import { ActivityFiltersComponent } from './component/activity-filters/activity-filters.component';
import { UserProfileComponent } from './component/page/user-profile/user-profile.component';
import { UserActivityStatisticsComponent } from './component/user-activity-statistics/user-activity-statistics.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { ActivitiesComponent } from './component/activities/activities.component';
import { UserActivitiesPageComponent } from './component/page/user-activities-page/user-activities-page.component';
import { UserCreatedActivitiesComponent } from './component/user-created-activities/user-created-activities.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LanguageSelectComponent,
    HeaderComponent,
    LoginFormComponent,
    HomeComponent,
    Error404Component,
    SpinnerComponent,
    UnknownErrorComponent,
    UserCardComponent,
    UsersComponent,
    PaginationComponent,
    ActivitiesPageComponent,
    ActivityCardComponent,
    ActivityFiltersComponent,
    UserProfileComponent,
    UserActivityStatisticsComponent,
    SearchBarComponent,
    ActivitiesComponent,
    UserActivitiesPageComponent,
    UserCreatedActivitiesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgOptimizedImage
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpErrorHandler, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
