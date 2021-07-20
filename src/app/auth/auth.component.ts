import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  errorMessage: any = null;
  signUpMessage: string = '';

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
    this.errorMessage=null;
  }

  submitAuthForm(data){
    console.log(data);
    if (this.isLoginMode) {
      this.authService.login(data.email,data.password).subscribe(
        (response)=>{
          this.route.navigate['/'];
        },
        (errorResp)=>{
          this.errorMessage=errorResp.error.errors;
          console.log(errorResp)
        }
      )
    }
    else{
      this.authService.signUp(data.name,data.email,data.password,data.cnfpassword)
      .subscribe(
        (response)=>{
          this.isLoginMode=true;
          this.signUpMessage='Signup succesfull login here';
        },
        (errorResp)=>{
          this.errorMessage=errorResp.error.errors;
          console.log(errorResp)
        }
      )
    }
  }

}
