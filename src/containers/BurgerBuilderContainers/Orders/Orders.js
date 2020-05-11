import React, { useEffect } from 'react';
import {connect} from 'react-redux'

import Order from '../../../components/BurgerBuilderComponents/Order/Order'
import axios from '../../../axios-orders'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions'
import Spinner from '../../../components/UI/Spinner/Spinner'

const Orders = (props) => {
    const {onFetchOrders, token, userId} = props;

    useEffect(() => {
        onFetchOrders(token, userId);
    }, [onFetchOrders, token, userId])

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
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));