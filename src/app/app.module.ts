import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from 'src/environments/environment';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminSetupComponent } from './components/admin-setup/admin-setup.component';
import { AdminGeneralSummaryComponent } from './components/admin-general-summary/admin-general-summary.component';
import { UserCheckComponent } from './components/user-check/user-check.component';
import { UserSummaryComponent } from './components/user-summary/user-summary.component';
import { SelectBranchComponent } from './components/select-windows/select-branch/select-branch.component';
import { SelectAttendanceComponent } from './components/select-windows/select-attendance/select-attendance.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminSetupComponent,
    AdminGeneralSummaryComponent,
    UserCheckComponent,
    UserSummaryComponent,
    SelectBranchComponent,
    SelectAttendanceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
