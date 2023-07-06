import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AttendanceApiService } from 'src/app/services/attendance-api/attendance-api.service';
import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';


@Component({
  selector: 'app-user-summary',
  templateUrl: './user-summary.component.html',
  styleUrls: ['./user-summary.component.scss']
})
export class UserSummaryComponent {

  constructor(
    private router: Router,
    private authApi: AuthApiService,
    private attendanceApi: AttendanceApiService,
  ) { }

  attendanceData: any;
  userData: any;
  sheetData: any;
  attendanceDate = new Date(String(localStorage.getItem("selected_attendance_date")));

  ngOnInit(): void {
    this.getAttendance();
    this.getUserRole();
    this.getPersonnelAttendanceSheet();
  }

  getUserRole(){
    const id = localStorage.getItem("uid") as string;

    this.authApi.getUserRole(id)
      .then(
        (res: any) => {
          console.log(res);
          this.userData = res;
        },
        (err: any) => {
          console.log(err);
          // this.connectionToast.openToast();
        }
      )
  }

  getAttendance() {
    const id = sessionStorage.getItem('attendance_attendance_id') as string;

    this.attendanceApi.getAttendance(id)
      .then((res) => {
        console.log(res);
        this.attendanceData = res;
      }),
      (err: any) => {
        console.log(err);
        // this.connectionToast.openToast();
      };
  }

  getPersonnelAttendanceSheet(){
    this.attendanceApi.getPersonnelAttendanceSheet()
      .then(
        (res: any) => {
          console.log(res.docs[0].data());
          this.sheetData = res.docs[0].data().sheet;
        },
        (err: any) => {
          console.log(err);
          // this.connectionToast.openToast();
        }
      )
  }

  logout(){
    console.log("u logging out? ...where u going?");

    this.authApi.logout()
      .then(
        (res: any) => {
          console.log(res);
          localStorage.removeItem("uid");
          window.location.href = "/";
        },
        (err: any) => {
          console.log(err);
          // this.connectionToast.openToast();
        }
      )
  }

}
