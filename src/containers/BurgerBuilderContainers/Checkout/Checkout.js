import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import CheckoutSummary from '../../../components/BurgerBuilderComponents/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
    const cancelledCheckoutHandler = () => {
        props.history.goBack();
    }

    const acceptedCheckoutHandler = () => {
        props.history.replace('/burgerbuilder/checkout/contact-data')
    }
    
    let summary = <Redirect to="/burgerbuilder"></Redirect>
    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/burgerbuilder"></Redirect> : null
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    cancelledCheckout={cancelledCheckoutHandler}
                    acceptedCheckout={acceptedCheckoutHandler}
                    ingredients={props.ings}
                ></CheckoutSummary>
                <Route
                    path='/burgerbuilder/checkout/contact-data'
                    component={ContactData}>
                </Route>
            </div>
        )
    }
    return summary;
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);