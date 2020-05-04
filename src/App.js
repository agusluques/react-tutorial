import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import TicTacToe from './containers/TicTacToe/TicTacToe';

class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder></BurgerBuilder>
        {/* <TicTacToe>Tictactoe</TicTacToe> */}
      </Layout>
    );
  };
}

export default App;
