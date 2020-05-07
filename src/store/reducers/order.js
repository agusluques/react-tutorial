import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility'


const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, {purchased: false})
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId})
    return updateObject(state, {
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true 
    })
}

const purchaseBurgerFail = (state) => {
    return updateObject(state, {loading: false})
}

const purchaseBurgerStart = (state) => {
    return updateObject(state, {loading: true})

}
const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {orders: action.orders, loading: false})
}

const fetchOrdersFail = (state) => {
    return updateObject(state, {loading: false})
}

const fetchOrdersStart = (state) => {
    return updateObject(state, {loading: true})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state)
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state)
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state)
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state)
        default: return state;
    }
};

export default reducer;