import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  baseUrl = "";
  usersRoleRef = this.firestore.collection('users_role');

  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.afAuth.signOut();
  }

  // user role

  createUserRole(data: any){
    return this.usersRoleRef.add(data);
  }

  updateUserRole(id:any, data: any){
    return this.usersRoleRef.doc(id).update(data);
  }

  deleteUserRole(id: any){
    return this.usersRoleRef.doc(id).delete();
  }

  setUserRole(id:any, data: any){
    return this.usersRoleRef.doc(id).set(data);
  }

  getUserRole(id: any){
    return this.usersRoleRef.doc(id).ref.get();
  }

  getUserRoleList(){
    return this.usersRoleRef.ref
      .orderBy("created_at", "desc")
      .get();
  }

}
