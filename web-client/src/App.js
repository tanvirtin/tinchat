import React from 'react';
import { Provider } from 'mobx-react';
import { MessageStore, TranslationStore, AuthenticationStore } from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

export default () => {
    return (
        <Router>
            <Provider
                message = { new MessageStore() }
                authentication = { new AuthenticationStore() }
                translation = { new TranslationStore() }
            >
                <Routes />
            </Provider>
        </Router>
    );
};
