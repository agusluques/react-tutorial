import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

const Apps = (props) => {

    const redirect = route => {
        console.log(props, route)
        props.history.push(route)
    }

    return (
        <div>
            {props.apps.map((app, index) => {
                return (
                    <button key={index} onClick={() => {redirect(app.route)}}>
                        {app.name}
                    </button>
                )
            })}
        </div>
    )
};

export default withRouter(Apps);