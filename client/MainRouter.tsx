import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/utils/PrivateRoute';
// screens
import Home from './pages/Home';
import Users from './pages/Users';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import Profile from './pages/profile/Profile';
import MyShops from './components/user/MyShops';
import MyAuctions from './components/user/MyAuctions';
import EditProfile from './pages/profile/EditProfile';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Shops from './pages/shop/Shops';
import ShopDetail from './pages/shop/ShopDetail';
import ShopOrders from './pages/shop/ShopOrders';
import AddShop from './pages/shop/AddShop';
import EditShop from './pages/shop/EditShop';
import ProductDetail from './pages/product/ProductDetail';
import AddProduct from './pages/product/AddProduct';
import EditProduct from './pages/product/EditProduct';
import AuctionDetail from './pages/auction/AuctionDetail';
import OpenAuctions from './components/auction/OpenAuctions';
import NewAuction from './pages/auction/NewAuction';
import EditAuction from './pages/auction/EditAuction';
import StripeConnect from './pages/StripeConnect';
import TopNavBar from './components/TopNavBar';

const MainRouter: FC = () => {
    return (
        <React.Fragment>
            <TopNavBar />
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/users" component={Users} />

                <Route exact path="/auth/signup" component={Signup} />
                <Route exact path="/auth/signin" component={Signin} />

                <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
                <Route exact path="/user/:userId" component={Profile} />
                <PrivateRoute path="/seller/shops" component={MyShops} />
                <PrivateRoute path="/myauctions" component={MyAuctions} />


                <Route path="/cart" component={Cart} />
                <Route path="/order/:orderId" component={Order} />
                <PrivateRoute path="/seller/orders/:shop/:shopId" component={ShopOrders} />
                
                <Route path="/shops/all" component={Shops} />
                <Route exact path="/shops/:shopId" component={ShopDetail} />
                <PrivateRoute path="/seller/shop/new" component={AddShop} />
                <PrivateRoute path="/seller/shop/edit/:shopId" component={EditShop} />

                <Route exact path="/product/:productId" component={ProductDetail} />
                <PrivateRoute path="/seller/:shopId/products/new" component={AddProduct} />
                <PrivateRoute path="/seller/:shopId/:productId/edit" component={EditProduct} />

                <Route path="/auction/:auctionId" component={AuctionDetail} />
                <Route path="/auctions/all" component={OpenAuctions} />
                <PrivateRoute path="/auction/new" component={NewAuction} />
                <PrivateRoute path="/auction/edit/:auctionId" component={EditAuction} />

                <Route path="/seller/stripe/connect" component={StripeConnect} />
            </Switch>
        </React.Fragment>
    );
};

export default MainRouter;
