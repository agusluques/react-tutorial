import React from 'react';

import classes from './Modal.css'
import Aux from '../../../hoc/Auxiliar/Auxiliar';
import Backdrop from '../Backdrop/Backdrop';


const Modal = (props) => {

    const showClass = {
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? 1 : 0
    }

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}></Backdrop>
            <div
                className={classes.Modal}
                style={showClass}>
                {props.children}
            </div>
        </Aux>
    )
};

export default React.memo(Modal, (prevProps, nextProps) => {
    // if props.show are different, modal update shouldn't be skipped
    return prevProps.show !== nextProps.show ? false : true
});