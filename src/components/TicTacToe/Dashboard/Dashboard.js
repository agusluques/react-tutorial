import React from 'react';

import classes from './Dashboard.css'
import Button from '../../UI/Button/Button'

const dashboard = (props) => {
    const playerString = props.actualPlayer ? "Player 1 (X)" : "Player 2 (O)";

    return (
        <div className={classes.Dashboard}>
            <h1>Tic-Tac-Toe</h1>
            <p>Player turns: {playerString}</p>
            <Button clicked={props.reset} btnType="Danger">Reset</Button>
        </div>
    );
};

export default dashboard;