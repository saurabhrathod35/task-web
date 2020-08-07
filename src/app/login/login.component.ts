import { Component, OnInit } from '@angular/core';
import { LoginDetails } from '../models/user.model';
// import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { NgForm, ControlContainer } from '@angular/forms';
import { ApiService } from '@app/shared/services/api/api.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ] 
})
export class LoginComponent implements OnInit {
  hide:boolean = true;
  showValidationMessage = ''
  loginDetails:LoginDetails = new LoginDetails();
  constructor(private $api:ApiService,private $route:Router) { }
  state: string = 'rotated';

  ngOnInit() {
  }

  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
}

  login(form:NgForm){
    if(form.invalid){
      return;
    }
    this.$api.post('login',this.loginDetails).subscribe(auth=>{
      if(auth){
        localStorage.setItem('token',JSON.stringify(auth['access_token']));
        this.$route.navigate(['secure']);
      }else{
       this.showValidationMessage = 'Invalid Username or Password.'
      }
    },err=>{
       this.showValidationMessage = err.error.message //'Invalid Username or Password.' 
      // console.error('error',err.message); 
    })
  }
}
