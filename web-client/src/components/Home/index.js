import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Home from './Home';
import UserCard from '../UserCard';
import MessageCard from '../MessageCard';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { MessageService, AuthenticationService, UserSearchService } from '../../services';
import { observer, inject } from 'mobx-react';

@inject('authentication')
@observer
class HomeContainer extends Component {
    constructor (props) {
        super(props);
        this.currentPage = 0;
        this.unseenMessagesMap = {};
        this.state = {
            messages: [],
            userDropdownOptions: {},
            selectedUsers: {},
            userSearchLoading: false,
            recipient: null,
            loaderActive: false,
        };
        this.attachSocketIOHandler();
    }
    attachSocketIOHandler () {
        const { location: { protocol, hostname, port } } = window;
        const host = `${protocol}//${hostname}:${parseInt(port, 10) + 1}`;
        this.socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT || host);
        this.socket.on(this.props.authentication.token, messageResponse => {
            if (
                // Safety check
                this.state.recipient &&
                (
                    // If message.to is directed to the recipient who is one of the user that was searched and a tab exists for.
                    this.state.recipient.email === messageResponse.to ||
                    // Or if the message is from the recipient for which a tab exists on the left and is sent to the current user.
                    (
                        this.state.recipient.email === messageResponse.from &&
                        messageResponse.to === this.props.authentication.email
                    )
                ) &&
                // And we are not dealing with the scenario where the recipient is the current user (User is texting themselves)
                // This is to prevent duplicate messages from showing up in the UI, as sent message also puts a card in the ui.
                this.state.recipient.email !== this.props.authentication.email
            ) {
                const messages = [... this.state.messages];
                messages.push(
                    <MessageCard
                        messageRef = {this.messageRef}
                        key = {Math.random()}
                        message = {messageResponse.message}
                        timestamp = {moment(messageResponse.createdDate).format('hh:mm a')}
                        right = {messageResponse.from === this.props.authentication.email}
                        left = {messageResponse.from !== this.props.authentication.email}
                    />,
                );
                this.setMessagesState(messages);
            // If none of the other if statements are true, then we are in the scenario where the message sent via socket
            // is not the recipient (selected user). In this case we show a bubble indicating that the user has an unread
            // message from another user.
            } else if (messageResponse.from !== this.props.authentication.email) {
                if (messageResponse.from in this.unseenMessagesMap) {
                    this.unseenMessagesMap[messageResponse.from] += 1;
                } else {
                    this.unseenMessagesMap[messageResponse.from] = 1;
                }
                this.forceUpdate();
            }
        });
    }
    async onLogout () {
        const { authentication } = this.props;
        try {
            await AuthenticationService.logout(authentication.token);
            authentication.refreshAuthentication();
        } catch (err) {
            if (err && err.response && err.response.status > 201) {
                this.props.history.push('/login');
            } else if (err) {
                throw err;
            }
        }
    }
    onMessageScroll (event) {
        const yCoordinate = event.target && event.target.scrollTop;
        this.scrollHeight = event.target && event.target.scrollHeight;
        // Once all messages has been reached no need to make a request to the server.
        if (
            this.currentPage > 0 &&
            yCoordinate === 0 &&
            this.state.recipient &&
            !this.state.recipient.allMessagesRetrieved &&
            this.state.messages &&
            this.state.messages.length >= (process.env.REACT_APP_ITEMS_PER_PAGE || 15)
        ) {
            this.setState({ loaderActive: true }, async () => {
                try {
                    let messagesResponse = await MessageService.getConversation(
                        this.state.recipient.email,
                        ++this.currentPage,
                        process.env.REACT_APP_ITEMS_PER_PAGE || 15,
                        this.props.authentication.token
                    );
                    this.unseenMessagesMap[this.state.recipient.email] = messagesResponse.unseenItems;
                    messagesResponse = messagesResponse.items;
                    if (messagesResponse && messagesResponse.length === 0) {
                        return this.setState({
                            loaderActive: false,
                            recipient: { ... this.state.recipient, allMessagesRetrieved: true },
                        });
                    }
                    this.setState({ loaderActive: false }, () => {
                        const stateMessages = [... this.state.messages];
                        const messages = [];
                        for (let i = messagesResponse.length - 1; i >= 0; --i) {
                            const messageResponse = messagesResponse[i];
                            this.messageRef = React.createRef();
                            messages.push(
                                <MessageCard
                                    messageRef = {this.messageRef}
                                    key = {Math.random()}
                                    message = {messageResponse.message}
                                    timestamp = {moment(messageResponse.createdDate).format('hh:mm a')}
                                    right = {messageResponse.from === this.props.authentication.email}
                                    left = {messageResponse.from !== this.props.authentication.email}
                                />,
                            );
                        }
                        if (this.state.recipient && !this.state.recipient.allMessagesRetrieved) {
                            this.setState({ messages: messages.concat(stateMessages) }, () => {
                                this.messageRef.current.scrollIntoView();
                            });
                        }
                    });
                } catch (err) {
                    this.setState({ loaderActive: false }, () => {
                        if (err && err.response && err.response.status > 201) {
                            this.props.history.push('/login');
                        } else if (err) {
                            throw err;
                        }
                    });
                }
            });
        }
    }
    onUserSearch (event) {
        const { currentTarget: { value } } = event;
        if (value) {
            this.setState({ userSearchLoading: true }, async () => {
                const { authentication } = this.props;
                try {
                    const results = await UserSearchService.search(value, authentication.token);
                    const userDropdownOptions = {};
                    results.forEach(result => {
                        const { email } = result;
                        userDropdownOptions[email] = result;
                    });
                    this.setState({
                        userSearchLoading: false,
                        userDropdownOptions,
                    });
                } catch (err) {
                    this.setState({ userSearchLoading: false }, () => {
                        if (err && err.response && err.response.status > 201) {
                            this.props.history.push('/login');
                        } else if (err) {
                            throw err;
                        }
                    });
                }
            });
        }
    }
    async onUserDropdownOptionSelect (event, { value: email }) {
        const { key } = event;
        if (key !== 'ArrowDown' && key !== 'ArrowUp') {
            const user = this.state.userDropdownOptions[email];
            const selectedUsers = { ... this.state.selectedUsers };
            let states = { recipient: user, userDropdownOptions: {} };
            if (!(user.email in this.state.selectedUsers)) {
                selectedUsers[email] = user;
                states.selectedUsers = selectedUsers;
            }
            this.setMessages(email, states);
        }
    }
    async onUserClick (email) {
        this.setState({ recipient: this.state.selectedUsers[email] });
        this.setMessages(email);
    }
    setMessagesState (messages, otherOptions) {
        this.setState({ messages, ... otherOptions }, () => {
            // Scroll into view will use the scroll bar of the nearest parent which is scrollable.
            this.messageRef && this.messageRef.current && this.messageRef.current.scrollIntoView();
        });
    }
    setMessages (email, otherOptions) {
        this.setState({ loaderActive: true }, async () => {
            try {
                let messagesResponse = await MessageService.getConversation(
                    email,
                    1,
                    process.env.REACT_APP_ITEMS_PER_PAGE || 15,
                    this.props.authentication.token
                );
                this.unseenMessagesMap[email] = messagesResponse.unseenItems;
                messagesResponse = messagesResponse.items;
                this.setState({ loaderActive: false }, () => {
                    this.currentPage = 1;
                    const messages = [];
                    for (let i = messagesResponse.length - 1; i >= 0; --i) {
                        const messageResponse = messagesResponse[i];
                        this.messageRef = React.createRef();
                        messages.push(
                            <MessageCard
                                messageRef = {this.messageRef}
                                key = {Math.random()}
                                message = {messageResponse.message}
                                timestamp = {moment(messageResponse.createdDate).format('hh:mm a')}
                                right = {messageResponse.from === this.props.authentication.email}
                                left = {messageResponse.from !== this.props.authentication.email}
                            />,
                        );
                    }
                    this.setMessagesState(messages, otherOptions);
                });
            } catch (err) {
                this.setState({ loaderActive: true }, () => {
                    if (err && err.response && err.response.status > 201) {
                        this.props.history.push('/login');
                    } else if (err) {
                        throw err;
                    }
                });
            }
        });
    }
    async sendMessage (event) {
        const { currentTarget: { value } } = event;
        event.currentTarget.value = '';
        if (!value) return;
        try {
            const res = await MessageService.sendMessage({
                to: this.state.recipient.email,
                message: value,
            }, this.props.authentication.token);
            if (res.status >= 200) {
                this.messageRef = React.createRef();
                const messages = [... this.state.messages];
                messages.push(
                    <MessageCard
                        messageRef = {this.messageRef}
                        key = {Math.random()}
                        message = {value}
                        timestamp = {moment().format('hh:mm a')}
                        right
                    />,
                );
                this.setMessagesState(messages);
            }
        } catch (err) {
            if (err && err.response && err.response.status > 201) {
                this.props.history.push('/login');
            } else if (err) {
                throw err;
            }
        }
    }
    onSendMessage (event) {
        if (event.key === 'Enter') {
            this.sendMessage(event);
        }
    }
    onCloseUserCard (email) {
        const selectedUsers = { ... this.state.selectedUsers };
        delete selectedUsers[email];
        let recipient = this.state.recipient;
        if (
            recipient &&
            typeof recipient === 'object' &&
            recipient.email === email
        ) {
            recipient = null;
            this.currentPage = 0;
        }
        this.setState({
            selectedUsers,
            recipient,
        });
    }
    render () {
        const { authentication: { id, email, firstName, lastName } } = this.props;
        return (
            <Home
                user = {{ id, email, firstName, lastName }}
                recipient = {this.state.recipient}
                selectedUsers = {Object.keys(this.state.selectedUsers).map(key => {
                    const user = this.state.selectedUsers[key];
                    const unseenMessages = this.unseenMessagesMap[user.email];
                    return (
                        <UserCard
                            onClick = {this.onUserClick.bind(this)}
                            key = {user.id}
                            user = {user}
                            selected = {user.email === (this.state.recipient && this.state.recipient.email)}
                            onCloseUserCard = {this.onCloseUserCard.bind(this)}
                            unseenMessages = {unseenMessages}
                        />
                    );
                })}
                userDropdownOptions = {Object.keys(this.state.userDropdownOptions).map(key => {
                    const result = this.state.userDropdownOptions[key];
                    const { id, email, firstName, lastName } = result;
                    return {
                        key: id,
                        value: email,
                        text: `${firstName} ${lastName}`,
                    };
                })}
                userSearchLoading = {this.state.userSearchLoading}
                messages = {this.state.messages}
                onSendMessage = {this.onSendMessage.bind(this)}
                onLogout = {this.onLogout.bind(this)}
                onUserSearch = {this.onUserSearch.bind(this)}
                onUserDropdownOptionSelect = {this.onUserDropdownOptionSelect.bind(this)}
                onMessageScroll = {this.onMessageScroll.bind(this)}
                loaderActive = {this.state.loaderActive}
            />
        );
    }
}

export default withRouter(HomeContainer);
