import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions'
import Layout from '../../hoc/Layout/Layout'
import BurgerBuilder from '../../containers/BurgerBuilderContainers/BurgerBuilder/BurgerBuilder';
import Logout from '../../containers/BurgerBuilderContainers/Auth/Logout/Logout'


const Checkout = React.lazy(() => {
    return import('../../containers/BurgerBuilderContainers/Checkout/Checkout');
})

const Orders = React.lazy(() => {
    return import('../../containers/BurgerBuilderContainers/Orders/Orders');
})

const Auth = React.lazy(() => {
    return import('../../containers/BurgerBuilderContainers/Auth/Auth');
})

const BurgerBuilderApp = (props) => {
    const { onTryAutoSignup } = props;

    useEffect(() => {
        onTryAutoSignup();
    }, [onTryAutoSignup]);


    let routes = (
        <Switch>
            <Route path="/burgerbuilder/auth" render={(props) => <Auth {...props}></Auth>}></Route>
            <Route path="/burgerbuilder" exact component={BurgerBuilder}></Route>
            {/* <Redirect to="/burgerbuilder"></Redirect> */}
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/burgerbuilder/orders" render={(props) => <Orders {...props}></Orders>}></Route>
                <Route path="/burgerbuilder/checkout" render={(props) => <Checkout {...props}></Checkout>}></Route>
                <Route path="/burgerbuilder/auth" render={(props) => <Auth {...props}></Auth>}></Route>
                <Route path="/burgerbuilder/logout" component={Logout}></Route>
                <Route path="/burgerbuilder" exact component={BurgerBuilder}></Route>
                {/* <Redirect to="/burgerbuilder"></Redirect> */}
            </Switch>
        )
    }

    return (
        <Layout>
            <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </Layout>
    )
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilderApp));