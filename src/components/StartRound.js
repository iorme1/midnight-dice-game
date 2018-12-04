import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { updatePlayerStats } from '../actions/optionActions';
import { roundStart } from '../actions/gameActions';

class StartRound extends Component {

    startGame = () => {
      if (this.props.game.roundInProgress) {
        alert('Round is already in progress dumb-dumb');
        return;
      }

      let updatedPlayersState = [...this.props.options.players];
      let { stakeAmount } = this.props.options;

      // player ante up
      updatedPlayersState.map(player => {
        player.profit -= stakeAmount;
        return player;
      })

      // change the round status state
      this.props.roundStart(true)
      // change profit state
      this.props.updatePlayerStats(updatedPlayersState);
    }

    render() {
      return (
        <Container style={{textAlign: 'center'}}>
          <Button
          color="success"
          onClick={this.startGame}
          >
            Start Round
          </Button>
        </Container>
      );
    }
}
const mapStateToProps = (state) => ({
  options: state.options,
  game: state.game
});

export default connect(mapStateToProps, { updatePlayerStats, roundStart })(StartRound);
