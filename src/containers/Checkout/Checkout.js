import React, { useState, useEffect, Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions'

const Checkout = (props) => {
    const cancelledCheckoutHandler = () => {
        props.history.goBack();
    }

    const acceptedCheckoutHandler = () => {
        props.history.replace('/checkout/contact-data')
    }
    
    let summary = <Redirect to="/"></Redirect>
    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/"></Redirect> : null
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    cancelledCheckout={cancelledCheckoutHandler}
                    acceptedCheckout={acceptedCheckoutHandler}
                    ingredients={props.ings}
                ></CheckoutSummary>
                <Route
                    path={props.match.path + '/contact-data'}
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