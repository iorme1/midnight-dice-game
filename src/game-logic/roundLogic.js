const RoundLogic = {
  handleTurnStats: function(currentPlayersState, currentPlayerID, currentPlayerSelections) {
    let qualified = this.qualificationHandler(currentPlayerSelections);
    let scoreTotal = qualified ? this.totalScore(currentPlayerSelections) : 0;

    let updatedPlayersState = currentPlayersState.map(player => {
      if (player.id === currentPlayerID) {
        return {
          ...player,
          selections: [...player.selections],
          playedTurn: true,
          scoreTotal: scoreTotal,
          qualified: qualified
        };
      } else {
        return {
          ...player,
          selections: [...player.selections]
        };
      }
    });

    return updatedPlayersState;
  },

  handleTieRound: function(playersState) {
    let updatedPlayersState = playersState.map(player => {
      return {
        ...player,
        selections: [],
        playedTurn: false 
      }
    });

    return updatedPlayersState;
  },


  handleWinRound: function(winnerID, profit, playersState) {
    let updatedPlayersState = playersState.map(player => {
      if (player.id === winnerID) {
        return {
          ...player,
          selections: [], // reset selections for new round
          profit: profit,
          playedTurn: false
        };
      } else {
        return {
          ...player,
          selections: [],  // reset selections for new round
          playedTurn: false
        };
      }
    });

    return updatedPlayersState;
  },


  updateSelectionState: function(currentPlayerSelections, currentPlayersState, activePlayerID) {
    let updatedPlayersState = currentPlayersState.map(playerInfo => {
      if (playerInfo.id === activePlayerID) {
        return {
          ...playerInfo,
          selections: currentPlayerSelections
        };
      } else {
        return {
          ...playerInfo,
          selections: [...playerInfo.selections]
        };
      }
    });

    return updatedPlayersState;
  },


  resetPlayerSelections: function(playersState) {
    let updatedPlayersState = playersState.map(player => {
      return {
        ...player,
        selections: [],
        playedTurn: false
      };
    });

    return updatedPlayersState;
  },


 getWinner: function(currentPlayersState) {
    let highestScore;
    let winningPlayers = [];
    let index = 0;

    let sortedScores = currentPlayersState
      .map(player => {
        return {
          ...player,
          selections: [...player.selections]
        };
      })
      .sort((a,b) => {
        return a.scoreTotal > b.scoreTotal ? -1 : 1;
      });

    highestScore = sortedScores[index].scoreTotal;

    while ( (index < sortedScores.length) && (sortedScores[index].scoreTotal === highestScore) ) {
      winningPlayers.push(sortedScores[index]);
      index += 1;
    }

    return winningPlayers;
  },

  totalScore: function(currentPlayerSelections) {
    // subtracting 5 from score due to qualifying dice 1 & 4
    return currentPlayerSelections.reduce((sum,accum) => sum += accum) - 5;
  },


  qualificationHandler: function(currentPlayerSelections) {
    let qualifiers = {
      4: false,
      1: false
    };

    currentPlayerSelections.forEach(dice => {
      if (dice === 4) {
        if (qualifiers[4] === false) qualifiers[4] = true;
      } else if (dice === 1) {
        if (qualifiers[1] === false) qualifiers[1] = true;
      }
    });

    return qualifiers[4] && qualifiers[1];
  },


  addToSelection: function(currentPlayer, diceNum) {
    let newSelection = [...currentPlayer.selections]
    newSelection.push(diceNum);

    return newSelection;
  },

  roundOver: function(players) {
    let turns = players.length - 1; // checking if all other players have played turns

    players.forEach(plyr => {
      if (plyr.playedTurn) turns -= 1;
    });

    return turns === 0 ? true : false;
  },

  getCurrentPlayer: function(players, activePlayerID) {
    return players.find(player => player.id === activePlayerID)
  },

  updateRoll: function(diceIdx, diceNum, currentRoll) {
    return currentRoll.filter((el,idx) => idx !== diceIdx );
  },

  activePlayerChange: function(activePlayerID, players) {
    let nextActivePlayer = activePlayerID + 1;

    if (nextActivePlayer > players.length) {
       nextActivePlayer = 1;
     }

    return nextActivePlayer;
  }
}


export default RoundLogic;
