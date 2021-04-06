import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './utils/PrivateRoute';

// pages
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Users from './pages/Users';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';


const MainRouter: FC = () => {
    return (
        <React.Fragment>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/users" component={Users} />

                <Route path="/auth/login" component={Login} />
                <Route path="/auth/register" component={Register} />

                <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
                <Route exact path="/user/:userId" component={Profile}/>
            </Switch>
        </React.Fragment>
    );
};

export default MainRouter;
