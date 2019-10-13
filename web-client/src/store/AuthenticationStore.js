import {
    observable,
    action,
} from 'mobx';

import Cookies from 'universal-cookie';
import config from '../config.json';

export class AuthenticationStore {
    // If any component's render depends on this attribute, then the component will instantly re-render.
    @observable token = '';
    // This variable is not reactive, meaning anything in render depending on this
    // attribute will not cause instant re-render.
    nonObservableToken = '';
    cookies = null;

    constructor () {
        this.cookies = new Cookies();
        const cookie = this.cookies.get('token');
        this.token = cookie;
        this.nonObservableToken = cookie;
    }

    @action storeToken (token) {
        this.token = token;
        this.nonObservableToken = token;
        this.cookies.set('token', token, {
            path: '/',
            maxAge: config.cookieMaxAge,
        });
    }

    @action refreshToken () {
        this.token = '';
        this.nonObservableToken = '';
        this.cookies.remove('token');
    }

    get token () {
        return this.token;
    }

    getStaticToken () {
        return this.nonObservableToken;
    }
}
