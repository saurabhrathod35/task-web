import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * This service stores and retrieves user preferences in session storage
 */
@Injectable()
export class AppConfigService {

    emailAddress: string = undefined;
    Username: string = undefined;
    isAuthorized = false;
    restDelay = 100;
    public myInfo: {};
    myRolesAndPermissions: any;
    public headerMenubar: BehaviorSubject<boolean>;
    constructor() {
        this.load();
        this.myInfo = {};
        this.myRolesAndPermissions = [];
        this.headerMenubar = new BehaviorSubject<boolean>(true);
    }

    toObject() {
        return {
            emailAddress: this.emailAddress,
            isAuthorized: this.isAuthorized,
            Username: this.Username,
            myInfo: this.myInfo,
            myRolesAndPermissions: this.myRolesAndPermissions,
            restDelay: this.restDelay
        };
    }

    public displayHeader(value: boolean) {
        this.headerMenubar.next(value);
    }

    load() {
        try {
            const data = JSON.parse(sessionStorage.getItem('appConfig'));
            return Object.assign(this, data);
        } catch (Error) { }

        return this;
    }

    save() {
        const obj = this.toObject();
        const string = JSON.stringify(obj);
        sessionStorage.setItem('appConfig', string);
    }

}
