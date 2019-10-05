import React from 'react';
import wrapper from '../../utils/stateless-component-wrapper';
import { Col, Row } from 'react-bootstrap';
import Avatar from '../Avatar';

import './styles.scss';

export default wrapper(props => {
    let { recentMessage } = props;
    const maxMessageLength = 20;
    if (recentMessage.length > maxMessageLength) {
        recentMessage = `${recentMessage.substring(0, maxMessageLength)}...`;
    }
    return (
        <Row className = 'user-card-container'>
            <Col>
                <div className = 'user-card'>
                    <Avatar size = 'medium'/>
                    <div className = 'user-card-text-group'>
                        <h1> {props.username} </h1>
                        <p> {recentMessage} </p>
                    </div>
                </div>
            </Col>
        </Row>
    );
});
