import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({
        //             ingredients: response.data
        //         })
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         this.setState({error: true})
        //     });
    }

    updatePurchase(ingredients) {

        const totalIngredients = Object.values(ingredients).reduce((tot, el) => {
            return tot + el;
        }, 0);

        return totalIngredients > 0;
    }

    clickPurchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false })
    };

    continuePurchaseHandler = () => {
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
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner></Spinner>;

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
                    ></BuildControls>
                </Aux>
            );

            orderSummary = <OrderSummary
                purchaseCancelled={this.cancelPurchaseHandler}
                purchaseContinued={this.continuePurchaseHandler}
                ingredients={this.props.ings}
                price={this.props.price}></OrderSummary>;
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
};


const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdd: (name) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: name }),
        onIngredientRemove: (name) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: name })
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));