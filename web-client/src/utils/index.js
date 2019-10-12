import {
    inject,
    observer,
} from 'mobx-react';

export default class {
    static getRandomNumber (min, max) {
        return Math.ceil(Math.random() * (max + 1 - min));
    }

    static decorateWithMobX (component) {
        return inject('translations')(observer(props => component(props)));
    }
}
