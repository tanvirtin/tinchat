import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import './styles.scss';

export default class MessageCard extends Component {
    render () {
        return (
            <Row>
                <div ref = {this.props.messageRef} className = {this.props.right ? 'message-card-right' : 'message-card-left'} xs = {1}>
                    <div className = 'message-card'>
                        <h6 className = 'message-user'> {this.props.username} </h6>
                        <p>
                            {this.props.message}
                        </p>
                    </div>
                </div>
            </Row>
        );
    }
};
