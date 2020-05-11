import React, {  useState } from 'react';
import { connect } from 'react-redux'

import Aux from '../Auxiliar/Auxiliar';
import classes from './Layout.css';
import Toolbar from '../../components/BurgerBuilderComponents/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/BurgerBuilderComponents/Navigation/SideDrawer/SideDrawer'

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const closedSideDrawerHandler = () => {
        setShowSideDrawer(false);
    }

    const clickedDrawerToggleHandler = () => {
        const newShowSideDrawer = !showSideDrawer;

        setShowSideDrawer(newShowSideDrawer);
    }


    return (<Aux>
        <Toolbar isAuthenticated={props.isAuthenticated} clickedDrawerToggle={clickedDrawerToggleHandler}></Toolbar>
        <SideDrawer isAuthenticated={props.isAuthenticated} showSideDrawer={showSideDrawer} closedSideDrawer={closedSideDrawerHandler}></SideDrawer>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
    )

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);