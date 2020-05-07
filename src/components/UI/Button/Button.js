import React from 'react'
import PropTypes from 'prop-types'

import classes from './Button.css'

const button = (props) => (
    <button
        onClick={props.clicked}
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
    >{props.children}
    </button>
);

button.propTypes = {
    clicked: PropTypes.func,
    btnType: PropTypes.string.isRequired,
    disabled: PropTypes.bool
}

export default button;