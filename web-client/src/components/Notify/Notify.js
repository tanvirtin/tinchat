import React from 'react';
import Utils from '../../utils';
import { Message } from 'semantic-ui-react';

import './styles.scss';

export default Utils.decorateWithMobX(props => {
    return (
        <Message style = {{
            visibility: props.show ? 'visible' : 'hidden',
        }} compact className = 'notify' floating content = {props.message} />
    );
});
