import React, { Component } from 'react';
import Field from '../../components/TicTacToe/Field/Field';
import Aux from '../../hoc/Auxiliar/Auxiliar';
import Dashboard from '../../components/TicTacToe/Dashboard/Dashboard';

class TicTacToe extends Component {
    state = {
        places: [
            {id: 'upper-left', player: null},
            {id: 'upper', player: null},
            {id: 'upper-right', player: null},
            {id: 'mid-left', player: null},
            {id: 'mid', player: null},
            {id: 'mid-right', player: null},
            {id: 'lower-left', player: null},
            {id: 'lower', player: null},
            {id: 'lower-right', player: null}
        ],
        actualPlayer: true
    }

    playerClicksHandler = (id) => {
        const newPlaces = [...this.state.places];

        newPlaces.map(x => {
            if (x.id.localeCompare(id) === 0){
                x.player = this.state.actualPlayer;
            } 
            return x;
        });

        const newTurn = !this.state.actualPlayer;

        this.setState({places: newPlaces, actualPlayer: newTurn});
    }

    resetStateHandler = () => {
        this.setState({
            places: [
                {id: 'upper-left', player: null},
                {id: 'upper', player: null},
                {id: 'upper-right', player: null},
                {id: 'mid-left', player: null},
                {id: 'mid', player: null},
                {id: 'mid-right', player: null},
                {id: 'lower-left', player: null},
                {id: 'lower', player: null},
                {id: 'lower-right', player: null}
            ],
            actualPlayer: true
        });
    } 


    render() {
        return(
            <Aux>
                <Dashboard actualPlayer={this.state.actualPlayer} reset={this.resetStateHandler}>Tic-Tac-Toe</Dashboard>
                <Field places={this.state.places} playerClicks={this.playerClicksHandler}></Field>
            </Aux>
        )
    }
};

export default TicTacToe;