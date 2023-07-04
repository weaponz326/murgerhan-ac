import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminSetupComponent } from './admin-setup/admin-setup.component';
import { AdminGeneralSummaryComponent } from './admin-general-summary/admin-general-summary.component';
import { UserCheckComponent } from './user-check/user-check.component';
import { UserSummaryComponent } from './user-summary/user-summary.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminSetupComponent,
    AdminGeneralSummaryComponent,
    UserCheckComponent,
    UserSummaryComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
