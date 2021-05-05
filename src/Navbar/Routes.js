import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history'
import MatchesPage from "../MatchesPage/MatchesPage"

import Signup from "../signup-page/Signup";
import ProfileFormPage from "../profile-form-FE/ProfileFormPage"
import LoginPage from "../login-page/LoginPage"

export default class Routes extends Component {
    history = {history}
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/Signup" component={Signup} />
                    <Route path="/ProfileForm" component={ProfileFormPage} />
                    <Route path="/Login" component={LoginPage} />
                    <Route path="/Matches" component={MatchesPage} />
                </Switch>
            </Router>
        )
    }
}
