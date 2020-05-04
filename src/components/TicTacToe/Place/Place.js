import React, { useEffect } from 'react';

import classes from './Place.css';

const Place = (props) => {
    useEffect(() => {
        console.log("update...")
    })

    let attachedClass = [classes.Place];

    switch (props.id) {
        case 'upper-left':
            attachedClass = [classes.Place, classes.UpperLeft]
            break;
        case 'upper':
            attachedClass = [classes.Place, classes.Upper]
            break;
        case 'upper-right':
            attachedClass = [classes.Place, classes.UpperRight]
            break;
        case 'mid-left':
            attachedClass = [classes.Place, classes.MidLeft]
            break;
        case 'mid':
            attachedClass = [classes.Place, classes.Mid]
            break;
        case 'mid-right':
            attachedClass = [classes.Place, classes.MidRight]
            break;
        case 'lower-left':
            attachedClass = [classes.Place, classes.LowerLeft]
            break;
        case 'lower':
            attachedClass = [classes.Place, classes.Lower]
            break;
        case 'lower-right':
            attachedClass = [classes.Place, classes.LowerRight]
            break;
        default:
            attachedClass = [classes.Place]
            break;
    };

    let content = null;

    if (props.player){ // true (player 1)
        content = 'X';
    } else if (props.player === false) { // check if false (player 2)
        content = 'O';
    }

    const disable = props.player !== null;
    console.log("disable", disable)

    return <button disabled={disable} className={attachedClass.join(' ')} onClick={() => props.clicked(props.id)}>{content}</button>
};

export default React.memo(Place);