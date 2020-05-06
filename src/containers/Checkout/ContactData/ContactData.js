import React, { useState } from 'react';
import {withRouter} from 'react-router-dom'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'

const ContactData = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [adress, setAdress] = useState({
        street: '',
        postalCode: ''
    });
    const [loading, setLoading] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        setLoading({ loading: true });

        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            customer: {
                name: name,
                address: {
                    street: adress.street,
                    zipCode: adress.postalCode
                }
            }
        };

        axios.post('/orders.json', order)
            .then(response => {
                setLoading(false);
                props.history.push('/');
            })
            .catch(error => {
                console.log(error)
            });
    }

    let form = (<form>
        <input className={classes.Input} type="text" name="name" placeholder="Enter your name"></input>
        <input className={classes.Input} type="email" name="email" placeholder="Enter your email"></input>
        <input className={classes.Input} type="text" name="street" placeholder="Enter your street"></input>
        <input className={classes.Input} type="text" name="postalCode" placeholder="Enter your postal code"></input>
        <Button btnType='Success' clicked={orderHandler}>Order</Button>
    </form>);

    if (loading) form = <Spinner></Spinner>

    return (
        <div className={classes.ContactData}>
            <h4>Enter contact data</h4>
            {form}
        </div>
    );
};

export default withRouter(ContactData);