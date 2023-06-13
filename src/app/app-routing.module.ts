import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./component/page/home/home.component";
import { LoginFormComponent } from "./component/page/login-form/login-form.component";
import { Error404Component } from "./component/page/errors/error404/error404.component";
import { UnknownErrorComponent } from "./component/page/errors/unknown-error/unknown-error.component";
import { UsersComponent } from "./component/page/users/users.component";
import { ActivitiesPageComponent } from "./component/page/activities-page/activities-page.component";
import { UserProfileComponent } from "./component/page/user-profile/user-profile.component";
import { UserActivitiesComponent } from "./component/page/user-activities/user-activities.component";
import {
  UserCreatedActivitiesComponent
} from "./component/page/user-created-activities/user-created-activities.component";
import { UserFollowersComponent } from "./component/page/user-followers/user-followers.component";
import { UserFollowingsComponent } from "./component/page/user-followings/user-followings.component";

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserProfileComponent },
  { path: 'users/:id/activities', component: UserActivitiesComponent },
  { path: 'users/:id/created-activities', component: UserCreatedActivitiesComponent },
  { path: 'users/:id/followers', component: UserFollowersComponent },
  { path: 'users/:id/followings', component: UserFollowingsComponent },
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
