import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators'; 
import { SecureService } from '@app/secure/service/secure.service';
// import { AppService } from '../app.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(
        private $secure:SecureService

    ){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let tmp = localStorage.getItem('token') || '';

        const newRequest = req.clone({ 
            headers: req.headers.set('x-access-token', tmp ? JSON.parse (tmp) :'' )
        });
        const startTime = Date.now();
        let status: string;
        return next.handle(newRequest).pipe(
            tap(
                event => {
                    status = '';
                    if (event instanceof HttpResponse) {
                        status = 'succeeded';
                    }
                },
                error => {
                    status = 'failed';
                
                    if(error.status==401){
                        
                        this.$secure.showValidation('We regret to inform you session has been expired','OK').subscribe(data=>{ 
                            if(data.dismissedByAction){
                                this.$secure.backToLogin();
                            } 
                        })
                    }else if(error.status == 0) {
                        this.$secure.showValidation('We cannot connect to the server. Please refresh the page or try again in a few minutes. If the problem continues, please contact your system administrator.','OK').subscribe(data=>{ 
                            if(data.dismissedByAction){
                                location.reload();
                            } 
                        })
                    }
                }
            ),
            finalize(() => {
                const elapsedTime = Date.now() - startTime;
                const message = `${req.method} ${req.urlWithParams} ${status} in ${elapsedTime} ms`;
                this.requestLog(message);
            })
        );
    }
    private requestLog(msg: string) {

    }
}