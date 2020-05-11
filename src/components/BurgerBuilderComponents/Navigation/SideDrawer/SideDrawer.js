import React from 'react';

import classes from './SideDrawer.css';
import Logo from '../../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../../UI/Backdrop/Backdrop'
import Aux from '../../../../hoc/Auxiliar/Auxiliar'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.showSideDrawer){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <BackDrop show={props.showSideDrawer} clicked={props.closedSideDrawer}></BackDrop>
            <div className={attachedClasses.join(' ')}  onClick={props.closedSideDrawer}>
                <div className={classes.Logo}>
                    <Logo></Logo>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated}></NavigationItems>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;