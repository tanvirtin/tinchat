import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import wrapper from '../../utils/stateless-component-wrapper';
import { Input, Dropdown } from 'semantic-ui-react';
import Avatar from '../Avatar';

import './styles.scss';

export default wrapper(props => {
    const { translations } = props;
    const chatSelected = true;
    return (
        <Container className = 'home-container'>
            <Row className = 'profile-tab user-profile-tab'>
                <Col className = 'profile-avatar'> <Avatar/> </Col>
                <Dropdown
                    labeled
                    button
                    icon = 'setting'
                >
                    <Dropdown.Menu>
                        <Dropdown.Item text = {translations.getTranslation('logout')} />
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
            <Row className = 'row-container'>

                <Col className = 'scrollable user-container' xs = {3}>
                    <Row className = 'search'>
                        <Col>
                            <Input
                                size = 'mini'
                                fluid
                                icon = 'search'
                                placeholder = {translations.getTranslation('searchPlaceholder')}
                            />
                        </Col>
                    </Row>
                    {props.users}
                </Col>
                <Col className = 'message-container' xs = {9}>
                    {
                        chatSelected &&
                            <Row className = 'profile-tab chat-profile-tab'>
                                <Col> <Avatar/> </Col>
                            </Row>
                    }
                    {
                        chatSelected &&
                            <Row className = 'scrollable messages'>
                                <Col>
                                    {props.messages}
                                </Col>
                            </Row>
                    }
                    {
                        chatSelected &&
                            <Row className = 'send-message'>
                                <Col>
                                    <Input
                                        onKeyDown = {props.onSendMessage}
                                        className = 'message-input'
                                        size = 'mini'
                                        placeholder = {translations.getTranslation('typeMessagePlaceholder')}
                                    />
                                </Col>
                            </Row>
                    }
                </Col>
            </Row>
        </Container>
    );
});
