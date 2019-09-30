import React from 'react';
import { Col, Row } from 'react-bootstrap';
import wrapper from '../../utils/stateless-component-wrapper';
import { Input, Dropdown } from 'semantic-ui-react';
import Avatar from '../Avatar';

import './styles.scss';

export default wrapper(props => {
    const { translations } = props;
    return (
        <div className = 'home-container'>
            <Row className = 'row-container'>
                <Col className = 'user-container' xs = {3}>
                    <Row className = 'profile-tab user-profile-tab'>
                        <Col> <Avatar/> </Col>
                        <Dropdown
                            floating
                            labeled
                            button
                            icon = 'setting'
                        >
                            <Dropdown.Menu>
                                <Dropdown.Item text = {translations.getTranslation('logout')} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                    <Row className = 'search'>
                        <Col>
                            <Input size = 'mini' fluid icon = 'search' placeholder = 'Search...' />
                        </Col>
                    </Row>
                </Col>
                <Col className = 'message-container' xs = {9}>
                    <Row className = 'profile-tab chat-profile-tab'>
                        <Col> <Avatar/> </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
});
