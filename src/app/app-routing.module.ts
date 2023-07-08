import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminSetupComponent } from './components/admin-setup/admin-setup.component';
import { AdminGeneralSummaryComponent } from './components/admin-general-summary/admin-general-summary.component';
import { UserCheckComponent } from './components/user-check/user-check.component';
import { UserSummaryComponent } from './components/user-summary/user-summary.component';

const routes: Routes = [
  { 
    path: "", 
    component: HomeComponent,
    children: [
      { path: "", component: LoginComponent},
      { path: "login", component: LoginComponent},
      { 
        path: "admin-setup", 
        component: AdminSetupComponent, 
        canActivate: [() => { return !!localStorage.getItem("uid") }]
      },
      { 
        path: "admin-general-summary", 
        component: AdminGeneralSummaryComponent,
        canActivate: [
          () => { return !!localStorage.getItem("uid") },
          () => { return !!sessionStorage.getItem("attendance_attendance_id") }
        ]
      },
      { 
        path: "user-check", 
        component: UserCheckComponent,
        canActivate: [
          () => { return !!localStorage.getItem("uid") },
          () => { return !!sessionStorage.getItem("attendance_attendance_id") }
        ]
      },
      { 
        path: "user-summary", 
        component: UserSummaryComponent,
        canActivate: [
          () => { return !!localStorage.getItem("uid") },
          () => { return !!sessionStorage.getItem("attendance_attendance_id") }
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
