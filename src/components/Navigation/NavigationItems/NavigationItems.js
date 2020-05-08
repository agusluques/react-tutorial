import React from 'react';

import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/burgerbuilder" exact>Burger Builder</NavigationItem>
        { props.isAuthenticated ? <NavigationItem link="/burgerbuilder/orders">Orders</NavigationItem> : null}
        { !props.isAuthenticated ? <NavigationItem link="/burgerbuilder/auth">Login</NavigationItem> : <NavigationItem link="/burgerbuilder/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;