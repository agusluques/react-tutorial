import React, { useEffect, useState } from 'react';

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const Orders = (props) => {
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios.get('/orders.json')
            .then(resp => {
                const orders = [];
                for (let key in resp.data) {
                    orders.push({
                        ...resp.data[key],
                        id: key
                    });
                }
                setOrders(orders)
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            })
    }, [])

    let renderedOrders = [];
    if (orders) {
        renderedOrders = orders.map((order) => {
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

export default withErrorHandler(Orders, axios);