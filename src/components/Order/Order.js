import React from 'react';

import classes from './Order.css'

const order = (props) => {
    let ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push(
            <span
                key={ingredient}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}>
                {ingredient} ({props.ingredients[ingredient]})
            </span>)
    }



    return (
        <div className={classes.Order}>
            <p>Ingredients: </p>{ingredients}
            <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>)
};

export default order;