import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import wrapper from '../../utils/stateless-component-wrapper';
import { Input, Dropdown } from 'semantic-ui-react';
import Avatar from '../Avatar';
import UserCard from '../UserCard';
import MessageCard from '../MessageCard';

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
                <Col className = 'pre-scrollable user-container' xs = {3}>
                    <Row className = 'search'>
                        <Col>
                            <Input size = 'mini' fluid icon = 'search' placeholder = {translations.getTranslation('searchPlaceholder')} />
                        </Col>
                    </Row>
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
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
                            <Row className = 'pre-scrollable messages'>
                                <Col>
                                    <MessageCard message = 'hello' username = 'User A' right/>
                                    <MessageCard message = 'sup' username = 'User B'/>
                                    <MessageCard message = 'not much' username = 'User A' right/>
                                    <MessageCard message = 'aight' username = 'User B'/>
                                    <MessageCard message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' username = 'User A' right/>
                                </Col>
                            </Row>
                    }
                    {
                        chatSelected &&
                            <Row className = 'send-message'>
                                <Col>
                                    <Input className = 'message-input' size = 'mini' placeholder = {translations.getTranslation('typeMessagePlaceholder')} />
                                </Col>
                            </Row>
                    }
                </Col>
            </Row>
        </Container>
    );
});
