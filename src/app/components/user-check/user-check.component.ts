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
  
  @ViewChild('confirmButtonElementReference', { read: ElementRef, static: false }) confirmButtonElement!: ElementRef;
  @ViewChild('checkButtonElementReference', { read: ElementRef, static: false }) checkButtonElement!: ElementRef;

  showPrompt = false;

  userData: any;

  clockType = "";
  personnelSheetData: any;
  sheetData: any;

  ngOnInit(): void {
    this.getUserRole();
    this.getPersonnelAttendanceSheet();
    this.checkAttendanceAvailable();
  }

  getUserRole(){
    let id = localStorage.getItem("uid");
    console.log(id);

    this.authApi.getUserRole(id)
      .then(
        (res: any) => {
          console.log(res.data());
          this.userData = res;
        },
        (err: any) => {
          console.log(err);
          // this.connectionToast.openToast();
        }
      )
  }

  getPersonnelAttendanceSheet(){
    this.attendanceApi.getPersonnelAttendanceSheet()
      .then(
        (res: any) => {
          console.log(res.docs[0].data());
          this.personnelSheetData = res.docs[0];
          this.sheetData = res.docs[0].data().sheet;
        },
        (err: any) => {
          console.log(err);
          // this.connectionToast.openToast();
        }
      )
  }

  updateAttendancePersonnelSheet(){
    console.log(this.sheetData);

    this.attendanceApi.updateAttendanceSheet(this.personnelSheetData.id, this.sheetData)
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

  checkAttendanceAvailable(){
    if(localStorage.getItem("attendance_attendance_id"))
      this.showPrompt = true;
  }

  getCurrentTime() {
    const currentTime = new Date();
    return formatDate(currentTime, 'hh:mm:ss a', 'en-US')
  }

  checkClock(type: any){
    console.log(type);
    this.clockType = type;

    if(this.clockType == "Clock In"){
      if(this.sheetData.clocked_in != null) this.openCheckModal()
      else this.openConfirmModal();
    }
    else if(this.clockType == "Clock Out"){
      if(this.sheetData.clocked_in != null) this.openCheckModal()
      else this.openConfirmModal();
    }
    else if(this.clockType == "Start Break"){
      if(this.sheetData.started_break != null) this.openCheckModal()
      else this.openConfirmModal();
    }
    else if(this.clockType == "End Break"){
      if(this.sheetData.ended_break != null) this.openCheckModal()
      else this.openConfirmModal();
    }
  }

  openCheckModal(){
    this.checkButtonElement.nativeElement.click();
  }

  openConfirmModal(){
    this.confirmButtonElement.nativeElement.click();
  }

  onConfirm() {
    console.log("You In!!!");
    if(this.clockType == "Clock In") { 
      this.sheetData.clocked_in = this.getCurrentTime();
      this.sheetData = { sheet: this.sheetData}
    }
    else if(this.clockType == "Clock Out") { 
      this.sheetData.clocked_out = this.getCurrentTime();
      this.sheetData = { sheet: this.sheetData}
    }
    else if(this.clockType == "Start Break") { 
      this.sheetData.started_break = this.getCurrentTime();
      this.sheetData = { sheet: this.sheetData}
    }
    else if(this.clockType == "End Break") { 
      this.sheetData.ended_break = this.getCurrentTime();
      this.sheetData = { sheet: this.sheetData}
    }

    console.log(this.sheetData);
    this.updateAttendancePersonnelSheet();
  }
  
}
