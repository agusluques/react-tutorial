import React, { useState, useEffect, Component } from 'react';
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
    const [ingredients, setIngredients] = useState({
        salad: 1,
        meat: 1,
        cheese: 1,
        bacon: 1
    });
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        const ingredients = {};
        let price = 0;

        for (let param of query.entries()) {
            if (param[0] === 'price') price = +param[1]
            else ingredients[param[0]] = +param[1];
        }

        setTotalPrice(price);
        setIngredients(ingredients);
    }, []);

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
                ingredients={ingredients}
            ></CheckoutSummary>
            <Route
                path={props.match.path + '/contact-data'}
                render={() => (<ContactData ingredients={ingredients} totalPrice={totalPrice}></ContactData>)}>
            </Route>
        </div>
    );
};

export default Checkout;