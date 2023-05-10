import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfileForm from '../auth/ProfileForm';
import ToolList from '../tools/ToolList';
import ToolDetail from '../tools/ToolDetail';
import './Routes.css';

function Routes({signup, login}){
    return (
        <div className='Routes'>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">
                    <LoginForm login={login} />
                </Route>
                <Route exact path="/signup">
                    <SignupForm signup={signup} />
                </Route>
                <Route exact path="/profile">
                    <ProfileForm />
                </Route>
                <Route exact path="/tools">
                    <ToolList />
                </Route>
                <Route exact path="/tools/:id">
                    <ToolDetail />
                </Route>
                <Route>
                    <div className='404'>Page Not Found</div>
                </Route>
                <Redirect to="/"/>
            </Switch>
        </div>
    )
}

export default Routes;