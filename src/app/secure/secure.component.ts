import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AppConfigService } from '@app/shared/services/auth/app-config.service';
import { ChangeToggleService } from '@app/shared/services/auth/changeToggle.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {

  sideMenu = true;
  mobileQuery: MediaQueryList;
  showFiller = false;  
  private _mobileQueryListener: () => void;
  constructor(
    public rootScope: AppConfigService,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    public $changeToggleService:ChangeToggleService
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 700px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  mouseEvent(event) {
  }

  ngOnInit() {
    this.$changeToggleService.getChangeToggle()
    .subscribe(res=>{
      this.sideMenu = res;
    });
  }

  toggleSideNav(navigationFromRoute?: boolean): void { 
      this.sideMenu = navigationFromRoute;
  }
}
