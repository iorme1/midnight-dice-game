import React, { Component } from 'react';
import PlayerRow from './PlayerRow';
import { Container } from 'reactstrap';
import { Table } from 'reactstrap';
import { playerChange } from '../actions/gameActions';
import { connect } from 'react-redux';

class Scoreboard extends Component {

  playerChange = (currentPlayerId) => {
    // check to see if the player is the last player in the player
    // array. If it is, instead of increasing the player ID by one,
    // change it back to one


  /*  if (this.props.players[currentPlayerId] == )
    this.props.playerChange(0); */
  }

  render() {
    let { players } = this.props.options;
  
    return (
      <Container>
        <div className="row">
          <div className="col-md-12 text-center">
            <Table
              style={
                {
                  backgroundColor: 'white',
                  opacity: 0.8,
                  border: '2px solid black'
                }
              }>
              <thead>
                <tr>
                  <th>Selection</th>
                  <th>Profit</th>
                  <th>Username</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {players.map( (player,i) => (
                  <PlayerRow
                    key={`player${i}`}
                    name={`player${player.id}`}
                    active={player.active}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  options: state.options
});

export default connect(mapStateToProps, { playerChange })(Scoreboard);
