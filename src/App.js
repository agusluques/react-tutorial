import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Apps from './Apps/Apps'
import TicTacToeApp from './Apps/TicTacToeApp/TicTacToeApp'
import BurgerBuilderApp from './Apps/BurgerBuilderApp/BurgerBuilderApp'

const App = (props) => {
  
  const apps = [
    {name: 'Burger Builder', route: '/burgerbuilder', description: 'This is a burger app. You can login/signup, build a burger, see your orders and checkout'},
    {name: 'Tic-Tac-Toe', route: '/tictactoe', description: 'This is a simple TicTacToe game'},
  ]


  return (
    <Switch>
      <Route path="/tictactoe" component={TicTacToeApp}></Route>
      <Route path="/burgerbuilder" component={BurgerBuilderApp}></Route>
      <Route path="/" exact render={()=> <Apps apps={apps}></Apps>}></Route>
      <Redirect to="/"></Redirect>
    </Switch>
  );
}

export default withRouter(App);
