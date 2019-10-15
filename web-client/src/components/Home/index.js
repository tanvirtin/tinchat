import React, { Component } from 'react';
import Home from './Home';
import UserCard from '../UserCard';
import MessageCard from '../MessageCard';
import moment from 'moment';
import { AuthenticationService, UserSearchService } from '../../services';
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
    onSearchSelect (e, { value: email }) {
        const user = this.state.userSearchResults[email];
        const selectedUsers = { ... this.state.selectedUsers };
        if (!(user.email in this.state.selectedUsers)) {
            selectedUsers[email] = user;
            this.setState({
                selectedUsers,
                recipient: user,
            });
        }
    }
    onUserClick (email) {
        this.setState({ recipient: this.state.selectedUsers[email] });
    }
    setMessage () {
        this.setState({ messages: this.state.messages }, () => {
            // Scroll into view will use the scroll bar of the nearest parent which is scrollable.
            this.messageRef.current.scrollIntoView();
        });
    }
    onSendMessage (event) {
        if (event.key === 'Enter') {
            const { currentTarget: { value } } = event;
            if (value) {
                this.messageRef = React.createRef();
                event.currentTarget.value = '';
                this.state.messages.push(
                    <MessageCard
                        messageRef = {this.messageRef}
                        key = {Math.random()}
                        message = {value}
                        timestamp = {moment().format('hh:mm a')}
                        right
                    />,
                );
                this.setMessage();
            }
        }
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
                            selected = {user.email === this.state.recipient.email}
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
