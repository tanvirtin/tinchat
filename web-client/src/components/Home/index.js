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
        this.state = { messages: [
            <MessageCard
                key = {Math.random()}
                message = {'I am starting this conversation'}
                timestamp = {moment().format('hh:mm a')}
                left
            />,
        ] };
    }
    async onLogout () {
        const { authentication } = this.props;
        try {
            await AuthenticationService.logout(authentication.token);
            authentication.refreshToken();
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
        return (
            <Home
                users = {[
                    <UserCard key = {0} username = {'Tinman'} recentMessage = {'Some message is the best'}/>,
                ]}
                messages = {this.state.messages}
                onSendMessage = {this.onSendMessage.bind(this)}
                onLogout = {this.onLogout.bind(this)}
            />
        );
    }
}

export default HomeContainer;
