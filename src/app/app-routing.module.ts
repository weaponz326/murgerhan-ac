import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminSetupComponent } from './admin-setup/admin-setup.component';
import { AdminGeneralSummaryComponent } from './admin-general-summary/admin-general-summary.component';
import { UserCheckComponent } from './user-check/user-check.component';
import { UserSummaryComponent } from './user-summary/user-summary.component';

const routes: Routes = [
  { 
    path: "", 
    component: HomeComponent,
    children: [
      { path: "", component: LoginComponent},
      { path: "login", component: LoginComponent},
      { path: "admin-setup", component: AdminSetupComponent},
      { path: "admin-general-summary", component: AdminGeneralSummaryComponent},
      { path: "user-check", component: UserCheckComponent},
      { path: "user-summary", component: UserSummaryComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
