import React, { Component } from 'react';
import random from '../utils/random';
import { connect } from 'react-redux';
import { rollDice , takeFromRoll, resetRoll } from '../actions/gameActions';
import { addToSelection, updatePlayerStats} from '../actions/optionActions';
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
      this.handleTurnCompletion(currentPlayer);
      this.resetRoll();
    }
  }


  handleTurnCompletion(currentPlayer) {
    let updatedPlayersState = [...this.props.options.players];
    let updatedCurrentPlayer = { ...currentPlayer};
    let nextPlayerID = this.playerChange(updatedCurrentPlayer);
    let hasQualified = this.qualificationHandler(updatedCurrentPlayer);
    let totalScore = hasQualified ? this.totalScore(updatedCurrentPlayer) : 0;

    updatedPlayersState.map(player => {
      if (player.id === currentPlayer.id) {
        currentPlayer.active = "false";
        player.playedTurn = true;
        player.scoreTotal = totalScore;
        player.qualified = hasQualified;
      } else if (player.id === nextPlayerID) {
        player.active = "true";
      }
      return player;
    });

    this.props.updatePlayerStats(updatedPlayersState);

    if (this.roundOver(updatedPlayersState)) {
      this.determineWinner(updatedPlayersState);
      this.resetPlayerSelections(updatedPlayersState);
    }
  }


  playerChange(currentPlayer) {
    let nextPlayerID = currentPlayer.id + 1;
    // need this check to determine if we have passed the player array length
    if (nextPlayerID > this.props.options.players.length) {
      nextPlayerID = 1;
    }
    return nextPlayerID;
  }

  totalScore(currentPlayer) {
     // subtracting 5 from score due to qualifying dice 1 & 4
    return currentPlayer.selections.reduce((sum,accum) => sum += accum) - 5;
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
    let highestScore = null;
    let winningPlayers = [];
    let index = 0;
    let sortedScores = [...updatedPlayersState].sort((a,b) => {
      return a.scoreTotal > b.scoreTotal ? -1 : 1
    });

    highestScore = sortedScores[index];

    while (sortedScores[index].scoreTotal === highestScore) {
      winningPlayers.push(sortedScores[index])
      index += 1;
    }

    if (winningPlayers.length > 1) {
      this.tieHandler(updatedPlayersState);
    } else {
      updatedPlayersState.map(player =>{
       if (player.id !== updatedPlayersState[0].id) player.profit -= this.props.options.stakeAmount;
       return player;
     });
     this.props.updatePlayerStats(updatedPlayersState)
   }
  }

  tieHandler(updatedPlayersState) {
    let newPlayerState = updatedPlayersState.map(player => {
      player.profit -= this.props.options.stakeAmount;
      return player;
    });

    this.props.updatePlayerStats(newPlayerState)
  }

  resetPlayerSelections(updatedPlayersState) {
    let newPlayerState = updatedPlayersState.map(player => {
      player.selections = [];
      player.playedTurn = false;
      return player;
    });

    this.props.updatePlayerStats(newPlayerState);
  }


  qualificationHandler(currentPlayer) {
    let qualifiers = {
      4: false,
      1: false
    };

    currentPlayer.selections.forEach(dice => {
      if (dice === 4) {
        if (qualifiers[4] === false) qualifiers[4] = true;
      } else if (dice === 1) {
        if (qualifiers[1] === false) qualifiers[1] = true;
      }
    });

    return qualifiers[4] && qualifiers[1];
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
   resetRoll,
   updatePlayerStats
 }
)(Roll);
