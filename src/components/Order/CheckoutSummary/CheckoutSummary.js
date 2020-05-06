import React, { useEffect } from 'react';

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'
import {withRouter} from 'react-router-dom'

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}></Burger>
            </div>
            <Button  btnType='Danger' clicked={props.cancelledCheckout}>Cancel</Button>
            <Button  btnType='Success' clicked={props.acceptedCheckout}>Continue</Button>
        </div>
    )
}

export default withRouter(checkoutSummary);