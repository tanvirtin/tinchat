import React, { Component } from 'react';
import Login from './Login';
import AuthService from '../../services/AuthService';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
            formSubmitted: false,
            showNotify: false,
            message: '',
        };
    }
    onSubmit (event) {
        event.preventDefault();
        if (this.state.formSubmitted === true) return;
        const { target: form } = event;
        this.setState({ formSubmitted: true }, async () => {
            try {
                await AuthService.login(form);
                this.setState({ formSubmitted: false });
            } catch (err) {
                this.setState({
                    showNotify: true,
                    message: err.message,
                    formSubmitted: false,
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            showNotify: false,
                            message: '',
                        });
                    }, 3000);
                });
            }
        });
    }
    render () {
        return (
            <Login
                message = {this.state.message}
                showNotify = {this.state.showNotify}
                formSubmitted = {this.state.formSubmitted}
                onSubmit = {this.onSubmit.bind(this)}
            />
        );
    }
};
