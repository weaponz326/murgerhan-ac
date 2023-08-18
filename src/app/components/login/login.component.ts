import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private authApi: AuthApiService,
  ) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  userRoleData: any;

  errorCode = "";
  errorMessage = "";
  passwordMismatch = false;

  saved: boolean = false;
  isSending: boolean = false;
  showPrompt = false;

  onSubmit(){
    this.saved = true;

    let email = this.loginForm.controls.email.value as string
    let password = this.loginForm.controls.password.value as string

    this.isSending = true;

    this.authApi.login(email, password)
      .then(
        (res: any) => {
          // console.log(res.user.uid);          
          localStorage.setItem('uid', res.user.uid);
          this.getUserRole();
        },
        (err: any) => {
          // console.log(err);
          this.isSending = false;
          this.errorMessage = err.message.replace("Firebase:", "").replace(/\(.*\)/, "").trim().replace(/\.$/, "");
          this.errorCode = err.code;
          // console.log(this.errorCode, this.errorMessage)
        }
      )
  }

  getUserRole() {
    const id = localStorage.getItem('uid') as string;

    this.authApi.getUserRole(id)
      .then((res) => {
        console.log(res.data());
        this.userRoleData = res;
        this.isSending = false;

        try{
          localStorage.setItem("selected_user_role", JSON.stringify(this.userRoleData.data()));
          localStorage.setItem("selected_branch", JSON.stringify(this.userRoleData.data().branch));
          this.routeByRole();
        }
        catch{
          // console.log("probably not logged in!");
        }
      }),
      (err: any) => {
        // console.log(err);
        this.isSending = false;
        // this.connectionToast.openToast();
      };
  }

  logout(){
    // e.stopPropagation();
    // console.log("u logging out? ...where u going?");

    this.authApi.logout()
      .then(
        (res: any) => {
          // console.log(res);
          localStorage.clear();
          window.location.href = "/";
        },
        (err: any) => {
          // console.log(err);
          // this.connectionToast.openToast();
        }
      )
  }

  routeByRole(){
    if(
      this.userRoleData.data().staff_role == "Assistant Manager" ||
      this.userRoleData.data().staff_role == "Manager" || 
      this.userRoleData.data().staff_role == "Head Manager" || 
      this.userRoleData.data().staff_role == "Administrator" ||
      this.userRoleData.data().staff_role == "General Manager"
    ) { 
      this.showPrompt = true;
      // console.log("is " + this.userRoleData.data().staff_role);
    }
    else {
      this.router.navigateByUrl('/user-check');
    }
  }

}
