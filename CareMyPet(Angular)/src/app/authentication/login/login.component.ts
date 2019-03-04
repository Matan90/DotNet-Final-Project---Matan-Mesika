import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserName:string;
  loginPassword:string;
  IsLogin:boolean;
  loginMessage:string;
  needRegistration:boolean;
  registrationFirstName:string;
  registrationLastName:string;
  registrationUserName:string;
  registrationPassword:string;
  clicked:boolean;

  constructor(
              private service:LoginService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {

  }

  login(){
    this.clicked = true;      
      this.service.loginRequest(this.loginUserName,this.loginPassword).subscribe(result => {
        if (result !== null){
          this.service.loggedInUser = {userName:this.loginUserName};
          this.service.storeUser(this.loginUserName, result);
          this.snackBar.open("Login completed successfully, now you can add new stores", "", {duration:2000})
            .afterDismissed()
            .toPromise()
            .then(t=> this.router.navigate(['/stores']));
        }
       else{
          this.snackBar.open("Login Faild.", "", {duration:2000})
          this.clicked = false;
        }
      });
    }

  register(){
    this.clicked = true;
    this.service.register(this.registrationFirstName ,this.registrationLastName ,this.registrationUserName, this.registrationPassword).subscribe(result => {
      if(result){
        this.snackBar.open("Registration completed successfully", "", {duration:2000})
          .afterDismissed()
          .toPromise()
          .then(t=> this.needRegistration = false);
          this.clicked = false;  
      }
      else{
        this.snackBar.open("Registration Faild", "", {duration:2000})
        .afterDismissed()
        .toPromise()
        .then(t=> this.needRegistration = true);
        this.clicked = false;        
      }
    });
  }
}
