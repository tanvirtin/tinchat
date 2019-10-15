import React from 'react';
import Utils from '../../utils';
import { Col, Row } from 'react-bootstrap';
import Avatar from '../Avatar';

import './styles.scss';

export default Utils.decorateWithMobX(props => {
    let { user } = props;
    let name = `${user.firstName} ${user.lastName}`;
    const maxCharLength = 15;
    if (name.length > maxCharLength) {
        name = `${name.substring(0, maxCharLength)}...`;
    }
    return (
        <Row style = {{ backgroundColor: props.selected ? '#f7f7f7' : 'white' }} className = 'user-card-container'>
            <Col>
                <div onClick = {() => props.onClick(user.email)} className = 'user-card'>
                    <Avatar firstLetter = {name[0].toUpperCase()} size = 'medium'/>
                    <div className = 'user-card-text-group'>
                        <h1> {name} </h1>
                    </div>
                </div>
            </Col>
        </Row>
    );
});
