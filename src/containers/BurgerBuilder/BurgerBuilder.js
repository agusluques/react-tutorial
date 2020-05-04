import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    meat: 50,
    cheese: 20,
    bacon: 25,
    salad: 10
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 250,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({error: true})
            });
    }

    updatePurchaseState(ingredients) {

        const totalIngredients = Object.values(ingredients).reduce((tot, el) => {
            return tot + el;
        }, 0);

        this.setState({ purchasable: totalIngredients > 0 })
    }

    clickPurchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false })
    };

    continuePurchaseHandler = () => {
        this.setState({ loading: true });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Agus',
                address: {
                    street: 'muñiz 842',
                    zipCode: 1234,
                    country: 'Argentina'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                this.setState({ loading: false, purchasing: false });
            });
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

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner></Spinner>;

        if (this.state.ingredients) {
            burger = (
                <Aux>
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

            orderSummary = <OrderSummary
                purchaseCancelled={this.cancelPurchaseHandler}
                purchaseContinued={this.continuePurchaseHandler}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}></OrderSummary>;
        };

        if (this.state.loading) {
            orderSummary = <Spinner></Spinner>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);