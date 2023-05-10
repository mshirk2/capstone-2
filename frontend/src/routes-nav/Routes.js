import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import './Routes.css';

function Routes({signup, login}){
    return (
        <div className='Routes'>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login"></Route>
                <Route exact path="/signup"></Route>
                <Route exact path="/profile"></Route>
                <Route exact path="/tools"></Route>
                <Route exact path="/tools/:id"></Route>
                <Route>
                    <div className='404'>Page Not Found</div>
                </Route>
                <Redirect to="/"/>
            </Switch>
        </div>
    )
}

export default Routes;