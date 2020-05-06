import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import TicTacToe from './containers/TicTacToe/TicTacToe';
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
        </Switch>
        <Route path="/tictactoe" component={TicTacToe}></Route>
      </Layout>
    );
  };
}

export default App;
