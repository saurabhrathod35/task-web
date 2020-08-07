import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '@app/shared/services/api/api.service';
import { Router } from '@angular/router';
import { SecureService } from '@app/secure/service/secure.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sideNav = new EventEmitter();;
  username = 'user';
  sideMenuVisible = true;
  toggleActive = true;
  showNotifications: boolean = false
  notificationCount = 0
  notifications = []
  URL = {
    customer: 'api/customer'
  }
  constructor(
    private $cdr: ChangeDetectorRef,
    private $api: ApiService, private $router: Router, private $secure: SecureService) { }

  ngOnInit() {
    this.username = (this.$secure.getDecodedAccessToken().username) || 'user'; 
  }


  toggleSideNav() {
    this.toggleActive = !this.toggleActive
    this.sideNav.emit(this.toggleActive)
    this.$cdr.markForCheck()
  }
  
  openHelp() {

  }
  logout() {
    localStorage.clear();
    this.$router.navigate(['']);
  }

  opendashboard() {
    this.$router.navigate(['secure/invoice/list'])
  }
  myprofile() {
    this.$router.navigate(['secure/myprofile'])
  } 
   
}



