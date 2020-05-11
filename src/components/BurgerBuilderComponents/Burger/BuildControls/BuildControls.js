import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <strong>${props.price.toFixed(2)}</strong>
            {controls.map((control) => {
                return <BuildControl
                    key={control.label}
                    label={control.label}
                    add={() => props.addIngredient(control.type)}
                    remove={() => props.removeIngredient(control.type)}
                    disabled={props.disabled[control.type]}
                ></BuildControl>
            })}
            <button onClick={props.clickPurchase} disabled={!props.purchasable} className={classes.OrderButton}>{props.isAuthenticated ? 'Order now!' : 'Signin to Order'}</button>
        </div>
    )
};

export default buildControls;