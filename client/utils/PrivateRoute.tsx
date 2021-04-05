import React, { Component, FC } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import auth from '../helpers/auth-helper';

interface PrivateRouteProps extends RouteProps {
    component: any;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{
                pathname: '/auth/login',
                state: { from: props.location }
            }} />
        )
    )} />
);

export default PrivateRoute;