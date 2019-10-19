import {
    inject,
    observer,
} from 'mobx-react';

export default class {
    static getRandomNumber (min, max) {
        return Math.ceil(Math.random() * (max + 1 - min));
    }

    static decorateWithMobX (component) {
        return inject('authentication', 'translation')(observer(props => component(props)));
    }
}
