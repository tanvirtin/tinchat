import {
    observable,
    action,
} from 'mobx';

export class AuthenticationStore {
    // If any component's render depends on this attribute, then the component will instantly re-render.
    @observable token = '';
    // This variable is not reactive, meaning anything in render depending on this
    // attribute will not cause instant re-render.
    nonObservableToken = '';

    @action storeToken (token) {
        this.token = token;
        this.nonObservableToken = token;
    }

    get token () {
        return this.token;
    }

    getStaticToken () {
        return this.nonObservableToken;
    }
}
