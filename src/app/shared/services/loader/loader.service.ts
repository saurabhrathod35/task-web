import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable( )
export class LoaderService {

  public loaderCounter: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor() { }
  public displayLoader(value: boolean) {
    const counter = value ? this.loaderCounter.value + 1 : this.loaderCounter.value - 1; 
    this.loaderCounter.next(counter); 
  }
}