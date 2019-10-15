import React from 'react';
import Utils from '../../utils';

import './styles.scss';

export default Utils.decorateWithMobX(props => {
    const size = props.size === 'medium' ? 'medium' : 'small';
    return (
        <div className = {`avatar-container avatar-${size}`}>
            {props.firstLetter}
        </div>
    );
});
