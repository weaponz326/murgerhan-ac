import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AttendanceApiService } from 'src/app/services/attendance-api/attendance-api.service';

@Component({
  selector: 'app-select-attendance',
  templateUrl: './select-attendance.component.html',
  styleUrls: ['./select-attendance.component.scss']
})
export class SelectAttendanceComponent {

  constructor(
    private attendanceApi: AttendanceApiService,
  ) { }

  @Output() rowSelected = new EventEmitter<object>();

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  // @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  attendanceListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  openModal(){
    this.attendanceListData = [];
    this.getAttendanceList();
    this.openButton.nativeElement.click();
  }

  getAttendanceList(){
    this.isFetchingData = true;

    this.attendanceApi.getAttendanceList()
      .then(
        (res: any) => {
          // console.log(res);
          this.attendanceListData = res.docs;
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          // this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    // console.log(row);
  }
  
}
