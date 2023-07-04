import { formatDate } from '@angular/common';
import { Component } from '@angular/core';


const DAY_MS = 60 * 60 * 24 * 1000;


@Component({
  selector: 'app-admin-setup',
  templateUrl: './admin-setup.component.html',
  styleUrls: ['./admin-setup.component.scss']
})
export class AdminSetupComponent {

  schedulesData: any;
  scheduleDatesData: any = [];

  array = Array;
  math = Math;

  dates: Array<Date> = [];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  currentDate = new Date();

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

}
