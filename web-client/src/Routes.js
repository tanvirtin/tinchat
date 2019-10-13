import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Authentication from './components/Authentication';
import Home from './components/Home';
import Utils from './utils';

export default Utils.decorateWithMobX(props => {
    const { authentication } = props;
    return (
        <Switch>
            <Route path = "/login">
                <Authentication />
            </Route>
            <Route path = "/register">
                <Authentication register />
            </Route>
            <Route path = "/home">
                {
                    authentication.token
                        ? <Home />
                        : <Redirect to = '/login'/>
                }
            </Route>
            <Route path = "/">
                {
                    authentication.nonObservableToken
                        ? <Redirect to = '/home'/>

                        : <Redirect to = 'login'/>
                }
            </Route>
        </Switch>
    );
});
