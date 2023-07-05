import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AttendanceApiService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  attendanceRef = this.firestore.collection('attendance_attendance');

  // attendance

  createattendance(data: any){
    return this.attendanceRef.add(data);
  }

  updateattendance(id:any, data: any){
    return this.attendanceRef.doc(id).update(data);
  }

  deleteattendance(id: any){
    return this.attendanceRef.doc(id).delete();
  }

  getattendance(id: any){
    return this.attendanceRef.doc(id).ref.get();
  }

  getattendanceList(){
    return this.attendanceRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

}
