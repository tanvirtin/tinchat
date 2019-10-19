import React from 'react';
import { Provider } from 'mobx-react';
import { TranslationStore, AuthenticationStore } from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import TranslationSwitch from './components/TranslationSwitch';
import Routes from './Routes';

export default () => {
    return (
        <Router>
            <Provider authentication = { new AuthenticationStore() } translation = { new TranslationStore() }>
                <TranslationSwitch />
                <Routes />
            </Provider>
        </Router>
    );
};
