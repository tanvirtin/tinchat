import React, { Component } from 'react';
import Home from './Home';
import UserCard from '../UserCard';
import MessageCard from '../MessageCard';
import moment from 'moment';
import { AuthenticationService } from '../../services';
import { observer, inject } from 'mobx-react';

@inject('authentication')
@observer
class HomeContainer extends Component {
    constructor (props) {
        super(props);
        const firstName = 'test';
        const lastName = 'test';
        this.state = {
            messages: [],
            searchedUsers: [
                <UserCard key = {0} name = {`${firstName} ${lastName}`} recentMessage = {'Some message is the best'}/>,
            ],
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
                recipient = {{ firstName: 'Tanvir' }}
                searchedUsers = {this.state.searchedUsers}
                messages = {this.state.messages}
                onSendMessage = {this.onSendMessage.bind(this)}
                onLogout = {this.onLogout.bind(this)}
            />
        );
    }
}

export default HomeContainer;
