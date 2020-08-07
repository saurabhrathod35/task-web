import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable( )
export class ChangeToggleService {

  constructor() { }
  private subject = new Subject<any>();

    setChangeToggle(config) {
        this.subject.next(config);
    }

    // clearConfig() {
    //     this.subject.next();
    // }

    getChangeToggle(): Observable<any> {
        return this.subject.asObservable();
    }
}
