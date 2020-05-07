import React, { useState } from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import * as orderActions from '../../../store/actions'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import {updateObject, validate} from '../../../shared/utility'

const ContactData = (props) => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter your name',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Enter your email',
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        deliveryMode: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        },
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const inputChangedHandler = (event, inputIdentifier) => {
        const newElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: validate(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        })       
        
        const newForm = updateObject(orderForm, {[inputIdentifier]: newElement});

        let formIsValid = true;

        for (let form in newForm){
            formIsValid = newForm[form].valid && formIsValid
        }

        setFormIsValid(formIsValid);
        setOrderForm(newForm);
    }

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (let form in orderForm) {
            formData[form] = orderForm[form].value
        }

        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };

       props.onPurchaseBurger(order, props.token)
    };

    let inputs = [];

    for (let input in orderForm) {
        inputs.push(
            <Input
                key={input}
                elementType={orderForm[input].elementType}
                elementConfig={orderForm[input].elementConfig}
                value={orderForm[input].value}
                changed={(event) => inputChangedHandler(event, input)}
                invalid={!orderForm[input].valid}
                shouldValidate={orderForm[input].validation}
                touched={orderForm[input].touched}>

            </Input>
        )
    }

    let form = (<form onSubmit={orderHandler}>
        {inputs}
        <Button btnType='Success' disabled={!formIsValid}>Order</Button>
    </form>);

    if (props.loading) form = <Spinner></Spinner>

    return (
        <div className={classes.ContactData}>
            <h4>Enter contact data</h4>
            {form}
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));