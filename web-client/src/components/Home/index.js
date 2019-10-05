import React, { Component } from 'react';
import Home from './Home';
import UserCard from '../UserCard';
import MessageCard from '../MessageCard';

class HomeContainer extends Component {
    constructor (props) {
        super(props);
        this.state = { messages: [] };
    }
    setMessage () {
        this.setState({ messages: this.state.messages }, () => {
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
                    <MessageCard messageRef = {this.messageRef} key = {Math.random()} message = {value} username = 'Current User'/>,
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
            />
        );
    }
}

export default HomeContainer;
