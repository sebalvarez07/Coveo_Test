import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <Switch> 
            <Route path="/" exact={true} component={DashboardPage} />
            <Route component={NotFoundPage} />
        </Switch>
    </Router>
);

export default AppRouter;