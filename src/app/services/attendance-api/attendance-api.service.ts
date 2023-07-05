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
  attendanceSheetRef = this.firestore.collection('attendance_attendance_sheet');

  // attendance

  createAttendance(data: any){
    return this.attendanceRef.add(data);
  }

  updateAttendance(id:any, data: any){
    return this.attendanceRef.doc(id).update(data);
  }

  deleteAttendance(id: any){
    return this.attendanceRef.doc(id).delete();
  }

  getAttendance(id: any){
    return this.attendanceRef.doc(id).ref.get();
  }

  getAttendanceList(){
    return this.attendanceRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

  // attendance sheet

  createAttendanceSheet(data: any){
    return this.attendanceSheetRef.add(data);
  }

  updateAttendanceSheet(id:any, data: any){
    return this.attendanceSheetRef.doc(id).update(data);
  }

  deleteAttendanceSheet(id: any){
    return this.attendanceSheetRef.doc(id).delete();
  }

  getAttendanceSheet(id: any){
    return this.attendanceSheetRef.doc(id).ref.get();
  }

  getAttendanceSheetList(){
    return this.attendanceSheetRef.ref
      .where("attendance", "==", sessionStorage.getItem("attendance_attendance_id"))
      .orderBy("created_at", "desc")
      .get();
  }

  createAttendanceSheetBatch(items: any): Promise<void> {
    const batch = this.firestore.firestore.batch();
    items.forEach((item: any) => {
      const newItemRef = this.attendanceSheetRef.doc().ref;
      batch.set(newItemRef, item);
    });
    return batch.commit();
  }

  updateAttendancePersonnelSheet(data: any): Promise<void> {
    const collection = "attendance_attendance_personnel";
    const collectionRef = this.firestore.collection(
      collection, ref => ref
        .where("attendance", '==', sessionStorage.getItem("attendance_attendance_id"))
        .where("personnel.id", '==', localStorage.getItem("uid"))
    );

    return collectionRef.get().toPromise().then(querySnapshot => {
      if(querySnapshot){
        querySnapshot.forEach(doc => {
          const docRef = collectionRef.doc(doc.id);
          docRef.update(data);
        });
      }
    });
  }

}
