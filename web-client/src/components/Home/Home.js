import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Utils from '../../utils';
import { Loader, Input, Dropdown } from 'semantic-ui-react';
import Avatar from '../Avatar';

import './styles.scss';

export default Utils.decorateWithMobX(props => {
    const {
        translation,
        user,
        recipient,
        selectedUsers,
        messages,
        onLogout,
        onSendMessage,
    } = props;
    return (
        <Container className = 'home-container'>
            <Row className = 'profile-tab user-profile-tab'>
                <Col className = 'profile-avatar'>
                    <Avatar firstLetter = {user.firstName[0].toUpperCase()}/>
                </Col>
                <Dropdown
                    labeled
                    button
                    icon = 'setting'
                >
                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick = {onLogout}
                            text = {translation.getTranslation('logout')}
                        />
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
            <Row className = 'row-container'>

                <Col className = 'scrollable user-container' xs = {3}>
                    <Row className = 'user-search'>
                        <Col>
                            <Dropdown
                                onSearchChange = {props.onUserSearch}
                                onChange = {props.onUserDropdownOptionSelect}
                                placeholder = {translation.getTranslation('searchPlaceholder')}
                                fluid
                                search
                                selection
                                value = {''}
                                options = {props.userDropdownOptions}
                                loading = {props.userSearchLoading}
                            />
                        </Col>
                    </Row>
                    {selectedUsers}
                </Col>
                <Col className = 'message-container' xs = {9}>
                    {
                        recipient &&
                            <Row className = 'profile-tab chat-profile-tab'>
                                <Col>
                                    <Avatar firstLetter = {recipient.firstName[0].toUpperCase()}/>
                                </Col>
                            </Row>
                    }
                    {
                        recipient &&
                            <Row onScroll = {props.onMessageScroll} className = 'scrollable messages'>
                                <Col>
                                    <Loader className = 'message-loader' active = {props.loaderActive}/>
                                    {messages}
                                </Col>
                            </Row>
                    }
                    {
                        recipient &&
                            <Row className = 'send-message'>
                                <Col>
                                    <Input
                                        onKeyDown = {onSendMessage}
                                        className = 'message-input'
                                        size = 'mini'
                                        placeholder = {translation.getTranslation('typeMessagePlaceholder')}
                                    />
                                </Col>
                            </Row>
                    }
                </Col>
            </Row>
        </Container>
    );
});
