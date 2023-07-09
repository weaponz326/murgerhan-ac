import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';
import { AttendanceApiService } from 'src/app/services/attendance-api/attendance-api.service';

import { SelectAttendanceComponent } from '../select-windows/select-attendance/select-attendance.component';


const DAY_MS = 60 * 60 * 24 * 1000;


@Component({
  selector: 'app-admin-setup',
  templateUrl: './admin-setup.component.html',
  styleUrls: ['./admin-setup.component.scss']
})
export class AdminSetupComponent {

  constructor(
    private router: Router,
    private usersApi: AuthApiService,
    private attendanceApi: AttendanceApiService,
  ) { }
  
  @ViewChild('confirmButtonElementReference', { read: ElementRef, static: false }) confirmButtonElement!: ElementRef;
  @ViewChild('existButtonElementReference', { read: ElementRef, static: false }) existButtonElement!: ElementRef;
  @ViewChild('selectAttendanceComponentReference', { read: SelectAttendanceComponent, static: false }) selectAttendance!: SelectAttendanceComponent;

  userListData: any;
  sheetListData: any;
  sheetData: any;

  branchName = JSON.parse(String(localStorage.getItem("selected_branch"))).data.branch_name;
  attendanceName = "";
  attendanceData: any;

  showCalendar = false;

  array = Array;
  math = Math;

  dates: Array<Date> = [];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  currentDate = new Date();
  selectedDate: any;

  calendarMonthYear = "";

  ngOnInit(): void {
    this.setCalendarDays(this.currentDate);
  }

  getBranchUserRoleList(){
    this.usersApi.getBranchUserRoleList()
      .then(
        (res: any) => {
          // console.log(res.docs);
          this.userListData = res.docs;
          this.showCalendar = true;
        },
        (err: any) => {
          // console.log(err);
          // this.connectionToast.openToast();
        }
      )
  }

  getGeneralAttendanceSheetList(){
    this.attendanceApi.getGeneralAttendanceSheetList()
      .then(
        (res: any) => {
          // console.log(res.docs);
          this.sheetListData = res.docs;    
          
          if(this.sheetListData.length != 0){
            // console.log("exists!");
            this.openExistModal();
          }
          else{
            // console.log("not exist!");
            this.openConfirmModal();
          }
        },
        (err: any) => {
          // console.log(err);
          // this.connectionToast.openToast();
        }
      )
  }

  createAttendanceSheetBatch(){
    this.attendanceApi.createAttendanceSheetBatch(this.sheetData)
      .then(() => {
        // console.log('Batch operation completed successfully!');
        this.router.navigateByUrl("/admin-general-summary");
      })
      .catch((error) => {
        console.error('Error performing batch operation:', error);
      });
  }

  setSheetData(){
    this.sheetData = this.userListData.map((item: any) => {
      return {
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        attendance: sessionStorage.getItem('attendance_attendance_id'),
        branch: JSON.parse(String(localStorage.getItem("selected_branch"))).id,
        date: this.selectedDate,
        personnel: {
          id: item.id,
          data: {
            staff_code: item.data().staff_code,
            full_name: item.data().full_name,
            staff_role: item.data().staff_role,
          }
        },
        sheet: {
          clocked_in: null,
          clocked_out: null,
          started_break: null,
          ended_break: null,
        }
      };
    });
  }

  getDateRange (startDate: Date, endDate: Date) {
    const dates = [];
    const date = new Date(startDate);
   
    while (date <= endDate) {
      // dates.push(new Date(date));
      dates.push(formatDate(date, 'yyyy-MM-dd', 'en-US'));
      
      date.setDate(date.getDate() + 1);
    }
   
    return dates;
  }
   
  setMonth(inc: any) {
    const [year, month] = [this.currentDate.getFullYear(), this.currentDate.getMonth()];
    this.currentDate = new Date(year, month + inc, 1);
    this.setCalendarDays(this.currentDate);
  }
  
  setCalendarDays(date = new Date) {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    this.calendarMonthYear = this.months[month] + " " + year;

    const calendarStartTime =  this.getCalendarStartDay(date).getTime();

    this.dates = this.range(0, 41).map(num => new Date(calendarStartTime + DAY_MS * num));
  }

  getCalendarStartDay(date = new Date) {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();

    return this.range(1,7)
      .map(num => new Date(firstDayOfMonth - DAY_MS * num))
      .find(dt => dt.getDay() === 0) as Date
  }

  range(start: any, end: any, length = end - start + 1) {
    return Array.from({ length }, (_, i) => start + i)
  }

  checkAttendanceExist(date: any){
    // console.log(date);
    this.selectedDate = date;
    localStorage.setItem("selected_attendance_date", this.selectedDate.toISOString());
    this.getGeneralAttendanceSheetList();    
  }

  openExistModal(){
    this.existButtonElement.nativeElement.click();
  }

  openConfirmModal(){
    this.confirmButtonElement.nativeElement.click();
  }

  onConfirm() {
    // console.log("Set Up!!!");
    this.setSheetData();
    this.createAttendanceSheetBatch();
  }

  openAttendanceWindow(){
    // console.log("You are opening select attendance window");
    this.selectAttendance.openModal();
  }

  onAttendanceSelected(data: any){
    // console.log(data);
    this.attendanceName = data.data().attendance_name;
    this.attendanceData = data.data();
    sessionStorage.setItem("attendance_attendance_id", data.id);
    this.getBranchUserRoleList();
  }

}
