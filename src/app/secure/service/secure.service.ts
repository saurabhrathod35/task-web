import { Injectable } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as jwt_decode from "jwt-decode"; 
import { Route, Router } from '@angular/router';

@Injectable()
export class SecureService {

  constructor(private sneackBar: MatSnackBar,private $route:Router) { }
  
  checkForm(form:NgForm){
    Object.keys(form.controls).forEach((element) => {
      if (form.controls[element] instanceof FormControl) {
        form.controls[element].markAsTouched();
      }
    });
  }

  backToLogin(){
    localStorage.clear();
    this.$route.navigate(['']);
  }

  showValidation(message,action?){
    let config={}
    if(!action){
      config =  {
        duration: 2000
      }
    }
   return this.sneackBar.open((message || ''), action || '',config ).afterDismissed();
  }

  getDecodedAccessToken(): any {
    let mainStorage = localStorage.getItem('token');
    let token =  mainStorage ? mainStorage : false 
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}
