import React from 'react';
import { Provider } from 'mobx-react';
import Translations from './store/Translations';
import TranslationSwitch from './components/TranslationSwitch';
import Login from './components/Login';

export default () => {
    return (
        <Provider translations = { new Translations() }>
            <TranslationSwitch />
            <Login />
        </Provider>
    );
};
