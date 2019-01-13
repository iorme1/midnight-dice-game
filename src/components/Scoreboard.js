import React, { Component } from 'react';
import PlayerRow from './PlayerRow';
import { Container } from 'reactstrap';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

class Scoreboard extends Component {
  render() {
    let { players } = this.props.players;

    return (
      <Container>
        <div className="row">
          <div className="col-md-12 text-center">
            <Table className="scoreboard">
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
                    id={player.id}
                    active={player.active}
                    profit={player.profit}
                    score={player.scoreTotal}
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
  players: state.players
});

export default connect(mapStateToProps)(Scoreboard);
