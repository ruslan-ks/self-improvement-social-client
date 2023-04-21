import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { AppComponent } from './app.component';
import { LanguageSelectComponent } from './component/language-select/language-select.component';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from './component/header/header.component';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { HomeComponent } from './component/home/home.component';
import { Error404Component } from './component/error404/error404.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginFormComponent },
  { path: '**', component: Error404Component }
]

@NgModule({
  declarations: [
    AppComponent,
    LanguageSelectComponent,
    HeaderComponent,
    LoginFormComponent,
    HomeComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
