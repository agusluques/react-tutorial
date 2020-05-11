import React from 'react';

import classes from './Field.css'
import Place from './Place/Place'

const field = (props) => {
    const returnedPlaces = props.places.map(place => {
        return <Place key={place.id} id={place.id} player={place.player} clicked={props.playerClicks}></Place>
    });

    return (
        <div className={classes.Field}>
            {returnedPlaces}
        </div>
    );
};

export default field;