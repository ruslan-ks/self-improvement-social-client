import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./component/home/home.component";
import { LoginFormComponent } from "./component/login-form/login-form.component";
import { Error404Component } from "./component/errors/error404/error404.component";
import { UnknownErrorComponent } from "./component/errors/unknown-error/unknown-error.component";
import { UsersComponent } from "./component/users/users.component";
import { ActivitiesPageComponent } from "./component/activities-page/activities-page.component";
import { UserProfileComponent } from "./component/user-profile/user-profile.component";

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserProfileComponent },
  { path: 'activities', component: ActivitiesPageComponent },
  { path: 'unknown-error', component: UnknownErrorComponent },
  { path: '**', component: Error404Component }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false }) // enableTracing is false by default
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
