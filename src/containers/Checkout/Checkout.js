import React, { useState, useEffect, Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';
import * as actionTypes from '../../store/actions'

const Checkout = (props) => {
    const cancelledCheckoutHandler = () => {
        props.history.goBack();
    }

    const acceptedCheckoutHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    return (
        <div>
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
    );
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);