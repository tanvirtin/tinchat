import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import './styles.scss';

export default class MessageCard extends Component {
    render () {
        return (
            <Row>
                <div ref = {this.props.messageRef} className = {this.props.left ? 'message-card-container-left' : 'message-card-container-right'} xs = {1}>
                    <Col className = {`message-card ${this.props.left ? 'message-card-left' : 'message-card-right'}`}>
                        {
                            this.props.username &&
                                <h6 className = 'message-user'> {this.props.username} </h6>
                        }
                        <p>
                            {this.props.message}
                            <small>{this.props.timestamp}</small>
                        </p>
                    </Col>
                </div>
            </Row>
        );
    }
};
