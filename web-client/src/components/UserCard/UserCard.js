import React from 'react';
import wrapper from '../../utils/stateless-component-wrapper';
import { Col, Row } from 'react-bootstrap';
import Avatar from '../Avatar';

import './styles.scss';

export default wrapper(props => {
    return (
        <Row className = 'user-card-container'>
            <Col>
                <div className = 'user-card'>
                    <Avatar size = 'medium'/>
                    <div className = 'user-card-text-group'>
                        <h1> User Name </h1>
                        <p> Recent Message </p>
                    </div>
                </div>
            </Col>
        </Row>
    );
});
