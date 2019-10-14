import React from 'react';
import Utils from '../../utils';
import { Col, Row } from 'react-bootstrap';
import Avatar from '../Avatar';

import './styles.scss';

export default Utils.decorateWithMobX(props => {
    let { recentMessage, name } = props;
    const maxCharLength = 15;
    if (recentMessage.length > maxCharLength) {
        recentMessage = `${recentMessage.substring(0, maxCharLength)}...`;
    }
    if (name.length > maxCharLength) {
        name = `${name.substring(0, maxCharLength)}...`;
    }
    return (
        <Row className = 'user-card-container'>
            <Col>
                <div className = 'user-card'>
                    <Avatar firstLetter = {props.name[0].toUpperCase()} size = 'medium'/>
                    <div className = 'user-card-text-group'>
                        <h1> {name} </h1>
                        <p> {recentMessage} </p>
                    </div>
                </div>
            </Col>
        </Row>
    );
});
