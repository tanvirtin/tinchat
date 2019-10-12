import React, { Component } from 'react';
import Register from './Register';
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
        if (this.state.formSubmitted === true) return;
        event.preventDefault();
        const { target: form } = event;
        this.setState({
            formSubmitted: true,
        }, async () => {
            try {
                await AuthService.login(form);
            } catch (err) {
                this.setState({
                    showNotify: true,
                    message: err.message,
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            showNotify: false,
                            message: '',
                        });
                    }, 3000);
                });
            }
            this.setState({
                formSubmitted: false,
            });
        });
    }
    render () {
        return (
            <Register
                message = {this.state.message}
                showNotify = {this.state.showNotify}
                formSubmitted = {this.state.formSubmitted}
                onSubmit = {this.onSubmit.bind(this)}
            />
        );
    }
};
