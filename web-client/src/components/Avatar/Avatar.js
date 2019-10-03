import React from 'react';
import wrapper from '../../utils/stateless-component-wrapper';

import './styles.scss';

export default wrapper(props => {
    const size = props.size === 'medium' ? 'medium' : 'small';
    return (
        <div className = {`avatar-container avatar-${size}`}/>
    );
});
