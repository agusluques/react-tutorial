import React, { Component } from 'react';

import Aux from '../Auxiliar/Auxiliar';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closedSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    clickedDrawerToggleHandler = () => {
        const newShowSideDrawer = !this.state.showSideDrawer;
        
        this.setState({
            showSideDrawer: newShowSideDrawer
        })
    }

    render() {
        return (<Aux>
            <Toolbar clickedDrawerToggle={this.clickedDrawerToggleHandler}></Toolbar>
            <SideDrawer showSideDrawer={this.state.showSideDrawer} closedSideDrawer={this.closedSideDrawerHandler}></SideDrawer>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
}

export default Layout;