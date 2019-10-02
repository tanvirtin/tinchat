import React from 'react';
import { Provider } from 'mobx-react';
import Translations from './store/Translations';
import TranslationSwitch from './components/TranslationSwitch';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default () => {
    return (
        <Router>
            <Provider translations = { new Translations() }>
                <TranslationSwitch />
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Provider>
        </Router>
    );
};
