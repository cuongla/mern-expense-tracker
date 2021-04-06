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
import Reports from './pages/Reports';
import Expenses from './pages/expense/Expenses';
import AddExpense from './pages/expense/AddExpense';


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

                <PrivateRoute path="/expenses/all" component={Expenses}/>
                <PrivateRoute path="/expenses/new" component={AddExpense}/>

                <PrivateRoute path="/expenses/reports" component={Reports}/>
            </Switch>
        </React.Fragment>
    );
};

export default MainRouter;
