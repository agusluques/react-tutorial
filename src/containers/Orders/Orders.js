import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'

const Orders = (props) => {

    useEffect(() => {
        props.onFetchOrders();
    }, [])

    let renderedOrders = <Spinner></Spinner>;
    if (!props.loading) {
        renderedOrders = props.orders.map((order) => {
            return (
                <Order key={order.id} ingredients={order.ingredients} price={order.price}></Order>
            )
        })
    }

    return (
        <div>
            {renderedOrders}
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));