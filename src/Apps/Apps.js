import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Apps.css'

const Apps = (props) => {

    const redirect = route => {
        props.history.push(route)
    }

    return (
        <div className={classes.Apps}>
            <h1>React Apps</h1>
            <div className={classes.AppsBox}>
                {props.apps.map((app, index) => {
                    return (
                        <div className={classes.AppCard} key={index} onClick={() => { redirect(app.route) }}>
                            <h1>{app.name}</h1>
                            <p>{app.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default withRouter(Apps);