import React, { Component } from 'react';
import Home from './Home';
import UserCard from '../UserCard';
import MessageCard from '../MessageCard';
import moment from 'moment';
import { MessageService, AuthenticationService, UserSearchService } from '../../services';
import { observer, inject } from 'mobx-react';

@inject('authentication')
@observer
class HomeContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            messages: [],
            userSearchResults: {},
            selectedUsers: {},
            userSearchLoading: false,
            recipient: null,
        };
    }
    async onLogout () {
        const { authentication } = this.props;
        try {
            await AuthenticationService.logout(authentication.token);
            authentication.refreshAuthentication();
        } catch (err) {
            throw err;
        }
    }
    onSearchUserChange (event) {
        const { currentTarget: { value } } = event;
        this.setState({ userSearchLoading: true }, async () => {
            const { authentication } = this.props;
            const results = await UserSearchService.search(value, authentication.token);
            const userSearchResults = {};
            results.forEach(result => {
                const { email } = result;
                userSearchResults[email] = result;
            });
            this.setState({
                userSearchLoading: false,
                userSearchResults,
            });
        });
    }
    async onSearchSelect (e, { value: email }) {
        const user = this.state.userSearchResults[email];
        const selectedUsers = { ... this.state.selectedUsers };
        let states = { recipient: user };
        if (!(user.email in this.state.selectedUsers)) {
            selectedUsers[email] = user;
            states.selectedUsers = selectedUsers;
        }
        this.setMessages(email, states);
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
    async setMessages (email, otherOptions) {
        const messagesResponse = await MessageService.getConversation(email, 1, 10, this.props.authentication.token);
        const messages = [];
        messagesResponse.forEach(messageResponse => {
            this.messageRef = React.createRef();
            messages.push(
                <MessageCard
                    messageRef = {this.messageRef}
                    key = {Math.random()}
                    message = {messageResponse.message}
                    timestamp = {moment().format('hh:mm a')}
                    right = {messageResponse.from === this.props.authentication.email}
                    left = {messageResponse.from !== this.props.authentication.email}
                />,
            );
        });
        this.setMessagesState(messages, otherOptions);
    }
    async sendMessage (event) {
        const { currentTarget: { value } } = event;
        event.currentTarget.value = '';
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
        if (recipient && typeof recipient === 'object' && recipient.email === email) {
            recipient = null;
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
                    return (
                        <UserCard
                            onClick = {this.onUserClick.bind(this)}
                            key = {user.id}
                            user = {user}
                            selected = {user.email === (this.state.recipient && this.state.recipient.email)}
                            onCloseUserCard = {this.onCloseUserCard.bind(this)}
                        />
                    );
                })}
                userSearchResults = {Object.keys(this.state.userSearchResults).map(key => {
                    const result = this.state.userSearchResults[key];
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
                onSearchUserChange = {this.onSearchUserChange.bind(this)}
                onSearchSelect = {this.onSearchSelect.bind(this)}
            />
        );
    }
}

export default HomeContainer;
