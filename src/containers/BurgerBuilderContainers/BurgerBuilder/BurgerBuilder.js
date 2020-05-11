import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import Aux from '../../../hoc/Auxiliar/Auxiliar';
import Burger from '../../../components/BurgerBuilderComponents/Burger/Burger';
import BuildControls from '../../../components/BurgerBuilderComponents/Burger/BuildControls/BuildControls'
import Modal from '../../../components/UI/Modal/Modal'
import OrderSummary from '../../../components/BurgerBuilderComponents/Burger/OrderSummary/OrderSummary'
import Spinner from '../../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions'
import axios from '../../../axios-orders';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const {onInitIngredients} = props;

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchase = (ingredients) => {

        const totalIngredients = Object.values(ingredients).reduce((tot, el) => {
            return tot + el;
        }, 0);

        return totalIngredients > 0;
    }

    const clickPurchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath(props.match.path + '/checkout')
            props.history.push(props.match.path + '/auth')
        }

    }

    const cancelPurchaseHandler = () => {
        setPurchasing(false);
    };

    const continuePurchaseHandler = () => {
        props.onPurchaseInit();
        props.history.push({
            pathname: props.match.path + '/checkout'
        });
    };



    const disabledInfo = {
        ...props.ings
    }

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner></Spinner>;

    if (props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings}>Burger</Burger>
                <BuildControls
                    addIngredient={props.onIngredientAdd}
                    removeIngredient={props.onIngredientRemove}
                    disabled={disabledInfo}
                    price={props.price}
                    purchasable={updatePurchase(props.ings)}
                    clickPurchase={clickPurchaseHandler}
                    isAuthenticated={props.isAuthenticated}
                ></BuildControls>
            </Aux>
        );

        orderSummary = <OrderSummary
            purchaseCancelled={cancelPurchaseHandler}
            purchaseContinued={continuePurchaseHandler}
            ingredients={props.ings}
            price={props.price}></OrderSummary>;
    };

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={cancelPurchaseHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );

};


const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdd: (name) => dispatch(actions.addIngredient(name)),
        onIngredientRemove: (name) => dispatch(actions.removeIngredient(name)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));