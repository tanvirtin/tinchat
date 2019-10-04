import React from 'react';
import wrapper from '../../utils/stateless-component-wrapper';
import { Row } from 'react-bootstrap';

import './styles.scss';

export default wrapper(props => {
    return (
        <Row>
            <div className = {props.right ? 'message-card-right' : 'message-card-left'} xs = {1}>
                <div className = 'message-card'>
                    <h6 className = 'message-user'> {props.username} </h6>
                    <p>
                        {props.message}
                    </p>
                </div>
            </div>
        </Row>
    );
});
