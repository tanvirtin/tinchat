import React from 'react';
import { Provider } from 'mobx-react';
import { TranslationsStore, AuthenticationStore } from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import TranslationSwitch from './components/TranslationSwitch';
import Routes from './Routes';

export default () => {
    return (
        <Router>
            <Provider authentication = { new AuthenticationStore() } translations = { new TranslationsStore() }>
                <TranslationSwitch />
                <Routes />
            </Provider>
        </Router>
    );
};
