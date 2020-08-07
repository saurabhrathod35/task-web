import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'; 
import * as _ from 'lodash';
import { LoaderService } from '../loader/loader.service';
import { environment } from '@env/environment';
@Injectable() 
export class ApiService {
  
  tmp = localStorage.getItem('perfeqta');
  apiUrl = environment.api ; 
  
  constructor(
    private http: HttpClient, 
    private loader: LoaderService
  ) { }
  uniqueName(url: string, record: any, showSuccessMessage?: boolean, header?: HttpHeaders) {
      // this.loader.displayLoader(true);
      return this.http.post(this.apiUrl + '/' + url, record, { headers: header })
        .pipe(map(data => {
          // this.loader.displayLoader(false);
          return this.extractData(data, showSuccessMessage);
        }), catchError(error => {
          // this.loader.displayLoader(false);
          return this.handleError(error);
        }));
    
  }
 
  // Fetch all records
  getAll(url, params?) {
    this.loader.displayLoader(true);
    return this.http.get(this.apiUrl + '/' + url, { params: params, observe: 'response' })
      .pipe(map(data => {
        this.loader.displayLoader(false);
        return this.extractData(data);
      }), catchError(error => {
        this.loader.displayLoader(false);
        return this.handleError(error);
      }));
  }
 
  // Fetch all records
  httpGet(url, params?) {
    this.loader.displayLoader(true);
    return this.http.get(url, { params: params, observe: 'response' })
      .pipe(map(data => {
        this.loader.displayLoader(false);
        return this.extractData(data);
      }), catchError(error => {
        this.loader.displayLoader(false);
        return this.handleError(error);
      }));
  }

  httpPost(url, params?) {
    this.loader.displayLoader(true);
    return this.http.post(url, { params: params, observe: 'response' })
      .pipe(map(data => {
        this.loader.displayLoader(false);
        return this.extractData(data);
      }), catchError(error => {
        this.loader.displayLoader(false);
        return this.handleError(error);
      }));
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} id
   * @returns
   * @memberof ResourceService
   */
  getById(url: string, id: string | number, params?, showSuccessMessage?: boolean) {
    this.loader.displayLoader(true);
    return this.http.get(`${this.apiUrl}/${url}/${id}`, { params: params, observe: 'response' })
      .pipe(map(data => {
        this.loader.displayLoader(false);
        return this.extractData(data);
      }), catchError(error => {
        this.loader.displayLoader(false);
        return this.handleError(error);
      }));
  }


  /**
   *
   *
   * @param {string} url
   * @param {*} record
   * @param {HttpHeaders} header
   * @returns
   * @memberof ResourceService
   */
  post(url: string, record: any, showSuccessMessage?: boolean, header?: HttpHeaders) {
    this.loader.displayLoader(true);
    return this.http.post(this.apiUrl + '/' + url, record, { headers: header })
      .pipe(map(data => {
        this.loader.displayLoader(false);
        return this.extractData(data, showSuccessMessage);
      }), catchError(error => {
        this.loader.displayLoader(false);
        return this.handleError(error);
      }));
  }


 
  /**
   *
   *
   * @param {string} url
   * @param {*} id
   * @param {*} record
   * @returns
   * @memberof ResourceService
   */
  patch(url: string, id: number | string, record: any, showSuccessMessage?: boolean) {
    this.loader.displayLoader(true);
    record = _.omit(record, ['isCurrent', 'client', 'createdDate', 'modifiedDate', 'identity', 'version']);
    return this.http.patch(`${this.apiUrl}/${url}/${id}`, record)
      .pipe(map(data => {
        this.loader.displayLoader(false);
        return this.extractData(data, showSuccessMessage);
      }), catchError(error => {
        this.loader.displayLoader(false);
        return this.handleError(error);
      }));
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} record
   * @returns
   * @memberof ResourceService
   */
  save(url: string, record: any, showSuccessMessage?: boolean) {
    if (record['_id'] && record['_id'] !== 'new') {
      return this.patch(url, record['_id'], record, showSuccessMessage);
    } else {
      return this.post(url, record, showSuccessMessage);
    }
  }

  /**
   *
   *
   * @param {string} resource
   * @param {*} id
   * @returns
   * @memberof ResourceService
   */
  delete(resource: string, id: number | string, showSuccessMessage?: boolean) {
    this.loader.displayLoader(true);
    return this.http.delete(`${this.apiUrl}/${resource}/${id}`)
      .pipe(map(data => {
        this.loader.displayLoader(false);
        return this.extractData(data, showSuccessMessage);
      }), catchError(error => {
        this.loader.displayLoader(false);
        return this.handleError(error);
      }));
  }

  /**
   *
   *
   * @param {Object} SuccessResponse
   * @returns
   * @memberof ResourceService
   */
  private extractData(res: Response | any, showSuccessMessage?: boolean) {
    const body: any = ((res && res['headers']) ? (res['body'] || []) : (res || {}));
    if (body.setHeaders && res && res['headers']) {
      body.setHeaders(res['headers']);
    }
    if (showSuccessMessage) {
    //   this.toastr.success(GeneralSetting.success);
    }
    return body;
  }

  /**
   *
   *
   * @param {Object} SuccessError
   * @returns
   * @memberof ResourceService
   */
  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw ? throwError(error) : throwError(error);
  }

}

declare global {
  interface Array<T> {
    headers: any;
    setHeaders(elem: T): void;
  }
}

if (!Array.prototype.headers) {
  Array.prototype.setHeaders = function (elem: any) {
    this.headers = elem;
  };
}