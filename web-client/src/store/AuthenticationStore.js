import {
    observable,
    action,
} from 'mobx';

import Cookies from 'universal-cookie';
import config from '../config.json';

export class AuthenticationStore {
    // If any component's render depends on this attribute, then the component will instantly re-render.
    @observable id = null;
    @observable email = null;
    @observable token = null;
    @observable firstName = null;
    @observable lastName = null;
    // This variable is not reactive, meaning anything in render depending on this
    // attribute will not cause instant re-render.
    nonObservableToken = null;
    cookies = null;

    constructor () {
        this.cookies = new Cookies();
        const cookieToken = this.cookies.get('token');
        this.token = cookieToken;
        this.nonObservableToken = cookieToken;
        this.id = this.cookies.get('id');
        this.email = this.cookies.get('email');
        this.firstName = this.cookies.get('firstName');
        this.lastName = this.cookies.get('lastName');
    }

    @action storeAuthentication (user) {
        this.nonObservableToken = user.token;
        for (const key in user) {
            this[key] = user[key];
            this.cookies.set(key, user[key], {
                path: '/',
                maxAge: config.cookieMaxAge,
            });
        }
    }

    @action refreshAuthentication () {
        this.token = null;
        this.cookies.remove('token');
        this.id = null;
        this.cookies.remove('id');
        this.email = null;
        this.cookies.remove('email');
        this.firstName = null;
        this.cookies.remove('firstName');
        this.lastName = null;
        this.cookies.remove('lastName');
    }
}
