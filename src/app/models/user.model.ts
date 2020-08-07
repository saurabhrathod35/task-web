import { Base, BaseInterface } from "./base.model";

export class User extends Base implements BaseInterface {
    _id: string = undefined;
    username: string = undefined;
    password: string = undefined;
    firstname: string = undefined;
    lastname: string = undefined;
    middlename: string = undefined;
    phonenumber: string = undefined;
    email: string = undefined;
    internals: Array<string> = [];
    constructor(user?) {
        super();
        this.setInstance(user);
    }
}

export class LoginDetails {
    username: string = undefined;
    password: string = undefined;
}