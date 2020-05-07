import React, { Component } from 'react';
import {connect} from 'react-redux'

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
            <Toolbar isAuthenticated={this.props.isAuthenticated} clickedDrawerToggle={this.clickedDrawerToggleHandler}></Toolbar>
            <SideDrawer isAuthenticated={this.props.isAuthenticated} showSideDrawer={this.state.showSideDrawer} closedSideDrawer={this.closedSideDrawerHandler}></SideDrawer>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);