import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, fromEvent, Observer } from 'rxjs';
import { LoaderService } from './shared/services/loader/loader.service';
import { ApiService } from './shared/services/api/api.service'; 
import { MatDialog } from '@angular/material';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  title = 'Facebook';
  loaderSubscription: Subscription;
  public onlineEvent: Observable<Event>;
  public offlineEvent: Observable<Event>;
  public subscriptions: Subscription[] = [];
  public displayLoader: any = {
    showLoading: false
  };
  generalsetting;
  public connectionStatusMessage: string;
  public connectionStatus: string;
  constructor(private loaderService: LoaderService, private $api: ApiService, public dialog: MatDialog) {

  }
  async ngOnInit() {
    
  }
  ngAfterViewInit() {
  
  }

  ngOnDestroy(): void {
    
  }

   
  openPopupSubscription() { 
    // const dialogRef = this.dialog.open(SubscriptionComponent, {
    //   width: '550px',
    //   data: { setting: get(this.generalsetting, 'data.0') },
    //   // closeOnNavigation:false,
    //   disableClose: true,

    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   // this.animal = result;
    // });
  }


}
