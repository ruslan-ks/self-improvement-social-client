import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from './app.component';
import { LanguageSelectComponent } from './component/language-select/language-select.component';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from './component/header/header.component';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { HomeComponent } from './component/home/home.component';
import { Error404Component } from './component/error404/error404.component';
import { AppRoutingModule } from "./app-routing.module";
import { SpinnerComponent } from './component/spinner/spinner.component';
import { AuthInterceptor } from "./interceptor/auth-interceptor";
import { GlobalErrorHandler } from "./error/global-error-handler";
import { UnknownErrorComponent } from './component/unknown-error/unknown-error.component';
import { GlobalHttpErrorHandler } from "./interceptor/global-http-error-handler.interceptor";

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
    UnknownErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
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
