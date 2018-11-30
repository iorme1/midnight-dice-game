import React, { Component } from 'react';
import random from '../utils/random';
import { connect } from 'react-redux';
import { rollDice , takeFromRoll, resetRoll } from '../actions/gameActions';
import { addToSelection, playerChange } from '../actions/optionActions';
import { diceMap } from '../utils/diceMap';
import Dice from './Dice';
import { Container,Button} from 'reactstrap';


class Roll extends Component {
  rollDice = () => {
    let { currentRoll } = this.props.game;
    let roll = [...currentRoll];

    let updatedRoll = roll.map(dice => random(1, 6))
    this.props.rollDice(updatedRoll);
  }


  takeFromRoll = (diceIdx, diceNum) => {
    let { currentRoll } = this.props.game;
    let currentPlayer = this.props.options.players.find(player => player.active === "true");
    let updatedRoll = currentRoll.filter((el,idx) => idx !== diceIdx );

    this.props.takeFromRoll(updatedRoll)
    this.addToSelection(currentPlayer, diceNum)

    if (currentPlayer.selections.length === 6) {
      this.playerChange(currentPlayer);
      this.resetRoll();
    }
  }


  playerChange(currentPlayer) {
    let updatedPlayersState = [...this.props.options.players];
    let updatedCurrentPlayer = {...currentPlayer};
    let currentPlayerID = updatedCurrentPlayer.id;
    let nextPlayerID = currentPlayerID + 1;

    // need this check to determine if we have passed the player array length
    if (nextPlayerID > this.props.options.players.length) {
      nextPlayerID = 1;
    }

    updatedPlayersState.map(player => {
      if (player.id === currentPlayerID) {
        player.active = "false";
        player.playedTurn = true;
      } else if (player.id === nextPlayerID) {
        player.active = "true";
      }
      return player;
    });

    if (this.roundOver(updatedPlayersState)) {
      this.determineWinner(updatedPlayersState);
      this.resetPlayerSelections(updatedPlayersState);
    } else {
      this.props.playerChange(updatedPlayersState);
    }
  }


  roundOver(playerState) {
    return playerState.every(player => player.playedTurn );
  }


  addToSelection(player, diceNum) {
    let updatedPlayerSelection = {...player};
    let updatedPlayersState = [...this.props.options.players];

    updatedPlayerSelection.selections.push(diceNum);

    updatedPlayersState.map(playerInfo => {
      if (playerInfo.id === player.id) {
        return updatedPlayerSelection;
      } else {
        return playerInfo;
      }
    });

    this.props.addToSelection(updatedPlayersState);
  }


  resetRoll() {
    let newDiceState = [0,0,0,0,0,0];
    this.props.resetRoll(newDiceState);
  }


  determineWinner(updatedPlayersState) {

  }


  resetPlayerSelections(updatedPlayersState) {
    
  }


  render() {
    let { currentRoll } = this.props.game;

    return (
      <Container>
        <div className="row">
          <div className="col-md-2">
            <Button
              color="primary"
              className="m-5"
              onClick={this.rollDice}
            >
            Roll Dice
            </Button>
          </div>
          {currentRoll.map( (dice,i) => (
            <Dice
              key={`dice${i}`}
              diceNumber={diceMap[dice]}
              take={this.takeFromRoll.bind(this, i, dice)}
            />
          ))}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
  options: state.options
});

export default connect(mapStateToProps, {
   rollDice,
   takeFromRoll,
   addToSelection,
   playerChange,
   resetRoll
 }
)(Roll);
