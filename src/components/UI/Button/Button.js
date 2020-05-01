import React from 'react'
import PropTypes from 'prop-types'

import classes from './Button.css'

const button = (props) => (
    <button
        onClick={props.clicked}
        className={[classes.Button, classes[props.btnType]].join(' ')}
    >{props.children}
    </button>
);

button.propTypes = {
    clicked: PropTypes.func.isRequired,
    btnType: PropTypes.string.isRequired
}

export default button;