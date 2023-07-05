import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { SelectAttendanceComponent } from '../select-windows/select-attendance/select-attendance.component';


const DAY_MS = 60 * 60 * 24 * 1000;


@Component({
  selector: 'app-admin-setup',
  templateUrl: './admin-setup.component.html',
  styleUrls: ['./admin-setup.component.scss']
})
export class AdminSetupComponent {

  @ViewChild('buttonElementReference', { read: ElementRef, static: false }) buttonElement!: ElementRef;
  @ViewChild('selectAttendanceComponentReference', { read: SelectAttendanceComponent, static: false }) selectAttendance!: SelectAttendanceComponent;

  branchName = JSON.parse(String(localStorage.getItem("selected_branch"))).data.branch_name;
  attendanceName = "";
  attendanceData: any;

  showCalendar = false;

  schedulesData: any;
  scheduleDatesData: any = [];

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
   
  setScheduleDateData(){
    for(let data of this.schedulesData){
      let dates = this.getDateRange(new Date(data.start_date), new Date(data.end_date));
      this.scheduleDatesData.push(dates);
    }

    console.log(this.scheduleDatesData);
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

  // isDateInRange(date: Date, schedulesData: any[]): boolean {
  //   for (const data of schedulesData) {
  //     const startDate = new Date(data.start_date);
  //     const endDate = new Date(data.end_date);
  
  //     if (date >= startDate && date <= endDate) {
  //       return true;
  //     }
  //   }
  
  //   return false;
  // }

  openConfirmModal(date: any){
    this.buttonElement.nativeElement.click();
    console.log(date);
    this.selectedDate = date;
  }

  onConfirm() {
    console.log("Set Up!!!");
  }

  openAttendanceWindow(){
    console.log("You are opening select attendance window")
    this.selectAttendance.openModal();
  }

  onAttendanceSelected(data: any){
    console.log(data);
    this.showCalendar = true;
    this.attendanceName = data.data().attendance_name;
    this.attendanceData = data.data();
    sessionStorage.setItem("attendance_id", data.id);
  }

}
