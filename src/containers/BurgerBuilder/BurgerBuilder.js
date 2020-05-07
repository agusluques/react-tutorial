import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchase(ingredients) {

        const totalIngredients = Object.values(ingredients).reduce((tot, el) => {
            return tot + el;
        }, 0);

        return totalIngredients > 0;
    }

    clickPurchaseHandler = () => {
        if (this.props.isAuthenticated){
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false })
    };

    continuePurchaseHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push({
            pathname: '/checkout'
        });
    };


    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner></Spinner>;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}>Burger</Burger>
                    <BuildControls
                        addIngredient={this.props.onIngredientAdd}
                        removeIngredient={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchase(this.props.ings)}
                        clickPurchase={this.clickPurchaseHandler}
                        isAuthenticated={this.props.isAuthenticated}
                    ></BuildControls>
                </Aux>
            );

            orderSummary = <OrderSummary
                purchaseCancelled={this.cancelPurchaseHandler}
                purchaseContinued={this.continuePurchaseHandler}
                ingredients={this.props.ings}
                price={this.props.price}></OrderSummary>;
        };

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
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