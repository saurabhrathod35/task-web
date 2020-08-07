import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from '@app/models/user.model';
import { SecureService } from '@app/secure/service/secure.service';
import { ApiService } from '@app/shared/services/api/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user:User = new User();
  comfirmPassword:string=''
  URL={
    user:'api/user'
  }
  constructor(
    private $secure:SecureService,
    private $api: ApiService,
    private $cdr: ChangeDetectorRef,
    private $route: Router
    ) { }

  ngOnInit() {
    this.getLogedInUser()
  }

  getLogedInUser(){
    let userDetails = this.$secure.getDecodedAccessToken();
    this.$api.getById(this.URL.user,userDetails._id).subscribe(user=>{
        this.user = new User(user);
        this.user.password=null
    })
  }


  listProduct() {
    this.$route.navigate(['secure/product/list']);
  }



  saveUser(userProfile){
    if(userProfile.invalid){
      return;;
    }else{
      this.$api.save(this.URL.user,this.user).subscribe(user=>{ 
         this.listProduct();
      })
    }
  }
}
