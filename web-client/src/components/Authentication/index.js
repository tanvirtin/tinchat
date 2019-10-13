import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { AuthenticationService } from '../../services';

@inject('authentication')
@observer
class Authentication extends Component {
    constructor (props) {
        super(props);
        this.state = {
            formSubmitted: false,
            showNotify: false,
            message: '',
        };
    }
    showNotification (message, callback) {
        this.setState({
            showNotify: true,
            formSubmitted: false,
            message,
        }, () => {
            const notificationTimeout = setTimeout(() => {
                this.setState({
                    showNotify: false,
                    message: '',
                });
            }, 3000);
            if (typeof callback === 'function') {
                clearTimeout(notificationTimeout);
                callback();
            }
        });
    }
    storeToken (response) {
        const { data: { token } } = response;
        const { authentication } = this.props;
        authentication.storeToken(token);
    }
    async authenticate (form) {
        if (this.props.register) {
            const response = await AuthenticationService.register(form);
            this.storeToken(response);
            this.showNotification('Registration successful!', () => {
                setTimeout(() => {
                    this.props.history.push('/home');
                }, 1000);
            });
        } else {
            const response = await AuthenticationService.login(form);
            this.storeToken(response);
            this.showNotification('Login successful!', () => {
                setTimeout(() => {
                    this.props.history.push('/home');
                }, 1000);
            });
        }
    }
    onSubmit (event) {
        if (this.state.formSubmitted === true) return;
        event.preventDefault();
        const { target: form } = event;
        this.setState({
            formSubmitted: true,
        }, async () => {
            try {
                await this.authenticate(form);
            } catch (err) {
                this.showNotification(err.message);
            }
        });
    }
    render () {
        return (
            this.props.register
                ? <Register
                    message = {this.state.message}
                    showNotify = {this.state.showNotify}
                    formSubmitted = {this.state.formSubmitted}
                    onSubmit = {this.onSubmit.bind(this)}
                />
                : <Login
                    message = {this.state.message}
                    showNotify = {this.state.showNotify}
                    formSubmitted = {this.state.formSubmitted}
                    onSubmit = {this.onSubmit.bind(this)}
                />
        );
    }
};

export default withRouter(Authentication);
