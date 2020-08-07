import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SecureComponent } from './secure/secure.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './secure/users/users.component';  
import { ValidationMessageComponent } from './shared/components/validation-message/validation-message.component'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { NgxBarcodeModule } from 'ngx-barcode';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './shared/services/api/api.service';
import { LoaderService } from './shared/services/loader/loader.service';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component'; 
import { AppConfigService } from './shared/services/auth/app-config.service';
import { ChangeToggleService } from './shared/services/auth/changeToggle.service'; 

import {
  DxListModule,
  DxButtonModule,
  DxFilterBuilderModule,
  DxDataGridModule,
  DxColorBoxModule
} from 'devextreme-angular';  
import { ApiInterceptor } from './shared/services/api/api.Interceptor';  
import { SecureService } from './secure/service/secure.service';
import { ProfileComponent } from './secure/user/profile/profile.component';
  
import { SearchPipe } from './secure/pipes/search/search.pipe'; 
import { PostListComponent } from './secure/post-list/post-list.component';
import { PostAddComponent } from './secure/post-add/post-add.component';
import { FileUploadService } from './secure/service/file.service';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [
    AppComponent,
    SecureComponent,
    LoginComponent,
    UsersComponent,  
    ValidationMessageComponent,
    HeaderComponent,
    FooterComponent, 
    ProfileComponent, 
    SearchPipe, 
    PostListComponent,
    PostAddComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    DxListModule,
    DxButtonModule,
    DxFilterBuilderModule,
    DxDataGridModule,
    DxColorBoxModule,
    NgxBarcodeModule,
  ], exports: [
    DxColorBoxModule
  ],
  entryComponents: [ 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    ApiService,
    LoaderService,
    AppConfigService,
    ChangeToggleService, 
    SecureService,
    FileUploadService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }