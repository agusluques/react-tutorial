import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    meat: 50,
    cheese: 20,
    bacon: 25,
    salad: 10
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 250,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {

        const totalIngredients = Object.values(ingredients).reduce((tot, el) =>{
            return tot + el;
        }, 0);

        this.setState({purchasable: totalIngredients > 0})
    }

    clickPurchaseHandler = () => {
        this.setState({purchasing: true});
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false})
    };

    continuePurchaseHandler = () => {
        alert('continued')
        this.setState({purchasing: false})
    };

    addIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = newCount;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] - 1 >= 0) {
            const newCount = this.state.ingredients[type] - 1;

            const updatedIngredients = {
                ...this.state.ingredients
            }

            updatedIngredients[type] = newCount;

            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

            this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });

            this.updatePurchaseState(updatedIngredients);
        }
    }


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    <OrderSummary 
                        purchaseCancelled={this.cancelPurchaseHandler}
                        purchaseContinued={this.continuePurchaseHandler}
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}>Burger</Burger>
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    clickPurchase={this.clickPurchaseHandler}
                ></BuildControls>
            </Aux>
        );
    }
}

export default BurgerBuilder;