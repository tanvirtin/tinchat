import {
    inject,
    observer,
} from 'mobx-react';

export default component => inject('translations')(observer(props => component(props)));
