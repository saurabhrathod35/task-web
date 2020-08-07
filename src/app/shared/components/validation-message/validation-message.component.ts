import { Component, OnInit, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';
import { GeneralSetting } from '../../../constant/GeneralSetting';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {
  @Input() private control: AbstractControlDirective | AbstractControl;
  @Input() customTitle?: string = '';
  @Input() customMessge?: string = '';

  constructor() { }

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.invalid);
  }

  listOfErrors(): string[] { 
    return Object.keys(this.control.errors)
      .map(field =>
        this.getMessage(field, this.control.errors[field])
      );
  }

  private getMessage(type: string, params?: any) {
    return GeneralSetting.validationMessage[type](params);
  }

  ngOnInit() {
  }

}
