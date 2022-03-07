import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import { me } from './store';
import AdminPage from './components/admin/AdminPage';
import AdminUser from './components/admin/AdminUser';
import AddProduct from './components/admin/AddProduct';
import AdminProduct from './components/admin/AdminProduct';
import AllProducts from './components/AllProducts';
import ViewCart from './components/ViewCart';
import SingleProduct from './components/SingleProduct';
import SingleUser from './components/SingleUser';
import EditUser from './components/EditUser';
import CheckoutUser from './components/CheckoutUser';
import SingleOrder from './components/SingleOrder';
import CheckoutGuest from './components/CheckoutGuest';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route exact path="/users/:id" component={SingleUser} />
            <Route path="/users/:id/edit" component={EditUser} />
            <Route path="/admin" component={AdminPage} />
            <Route path="/adminuser" component={AdminUser} />
            <Route path="/addproduct" component={AddProduct} />
            <Route path="/adminproduct" component={AdminProduct} />
            <Route path="/checkoutuser" component={CheckoutUser} />
            <Route path="/viewcart" component={ViewCart} />
            <Route path="/orders/:id" component={SingleOrder} />
            <Route path="/checkoutguest" component={CheckoutGuest} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/viewcart" component={ViewCart} />
            <Route path="/checkoutuser" component={CheckoutUser} />
            <Route path="/checkoutguest" component={CheckoutGuest} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
