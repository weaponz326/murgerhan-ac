import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AttendanceApiService } from 'src/app/services/attendance-api/attendance-api.service';
import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';


@Component({
  selector: 'app-user-check',
  templateUrl: './user-check.component.html',
  styleUrls: ['./user-check.component.scss']
})
export class UserCheckComponent {

  constructor(
    private router: Router,
    private authApi: AuthApiService,
    private attendanceApi: AttendanceApiService,
  ) { }
  
  @ViewChild('buttonElementReference', { read: ElementRef, static: false }) buttonElement!: ElementRef;

  userData: any;

  clockType = "";
  sheetData: any;

  ngOnInit(): void {
    this.getUserRole();
  }

  getUserRole(){
    let id = localStorage.getItem("uid");

    this.authApi.getUserRole(id)
      .then(
        (res: any) => {
          console.log(res.docs);
          this.userData = res;
        },
        (err: any) => {
          console.log(err);
          // this.connectionToast.openToast();
        }
      )
  }

  updateAttendancePersonnelSheet(){
    this.attendanceApi.updateAttendancePersonnelSheet(this.sheetData)
      .then(
        (res: any) => {
          console.log(res);
          this.router.navigateByUrl("/user-summary");
        },
        (err: any) => {
          console.log(err);
          // this.connectionToast.openToast();
        }
      )
  }

  getCurrentTime() {
    const currentTime = new Date();
    return formatDate(currentTime, 'hh:mm:ss a', 'en-US')
  }

  openConfirmModal(confirmType: string){
    this.buttonElement.nativeElement.click();
    console.log(confirmType);
    this.clockType = confirmType;
  }

  onConfirm() {
    console.log("You In!!!");
    if(this.clockType == "Clock In") { this.sheetData = { sheet: {clock_in: (this.getCurrentTime())}}}
    else if(this.clockType == "Clock Out") { this.sheetData = { sheet: {clock_out: (this.getCurrentTime())}}}
    else if(this.clockType == "Start Break") { this.sheetData = { sheet: {start_break: (this.getCurrentTime())}}}
    else if(this.clockType == "End Break") { this.sheetData = { sheet: {end_break: (this.getCurrentTime())}}}

    this.updateAttendancePersonnelSheet();
  }
  
}
