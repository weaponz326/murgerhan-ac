import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AttendanceApiService } from 'src/app/services/attendance-api/attendance-api.service';
import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';


@Component({
  selector: 'app-admin-general-summary',
  templateUrl: './admin-general-summary.component.html',
  styleUrls: ['./admin-general-summary.component.scss']
})
export class AdminGeneralSummaryComponent {

  constructor(
    private router: Router,
    private authApi: AuthApiService,
    private attendanceApi: AttendanceApiService,
  ) { }

  attendanceData: any;
  sheetListData: any;
  attendanceDate = new Date(String(localStorage.getItem("selected_attendance_date")));

  totalClockedIn = 0;
  totalClockedOut = 0;
  totalBreakStarted = 0;
  totalBreakEnded = 0;

  ngOnInit(): void {
    this.getAttendance();
    this.getGeneralAttendanceSheetList();
  }

  getAttendance() {
    const id = sessionStorage.getItem('attendance_attendance_id') as string;

    this.attendanceApi.getAttendance(id)
      .then((res) => {
        // console.log(res);
        this.attendanceData = res;
      }),
      (err: any) => {
        // console.log(err);
        // this.connectionToast.openToast();
      };
  }

  getGeneralAttendanceSheetList(){
    this.attendanceApi.getGeneralAttendanceSheetList()
      .then(
        (res: any) => {
          // console.log(res.docs);
          this.sheetListData = res.docs;    
          this.setSummary();
        },
        (err: any) => {
          // console.log(err);
          // this.connectionToast.openToast();
        }
      )
  }

  logout(){
    // console.log("u logging out? ...where u going?");

    this.authApi.logout()
      .then(
        (res: any) => {
          // console.log(res);
          localStorage.removeItem("uid");
          window.location.href = "/";
        },
        (err: any) => {
          // console.log(err);
          // this.connectionToast.openToast();
        }
      )
  }

  deactivate(){
    localStorage.removeItem('selected_attendance_date');
    this.logout();
  }

  setSummary(){
    this.totalClockedIn = this.sheetListData.filter((obj: any) => { return obj.data().sheet.clocked_in != null }).length;
    this.totalClockedOut = this.sheetListData.filter((obj: any) => { return obj.data().sheet.clocked_out != null }).length;
    this.totalBreakStarted = this.sheetListData.filter((obj: any) => { return obj.data().sheet.started_break != null }).length;
    this.totalBreakEnded = this.sheetListData.filter((obj: any) => { return obj.data().sheet.ended_break != null }).length;
  }

}
