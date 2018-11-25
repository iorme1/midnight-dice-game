import React, { Component } from 'react';
import PlayerRow from './PlayerRow';
import { Container } from 'reactstrap';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

class Scoreboard extends Component {

  render() {

    let { players } = this.props.options;

    return (
      <Container>
        <div
          className="row"
          style={{borderBottom: '1px solid black'}}
        >
          <div className="col-md-12 text-center">
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Profit</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {players.map( (player,i) => (
                  <PlayerRow
                    key={`player${i}`}
                    name={`player${i+1}`}
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

export default connect(mapStateToProps)(Scoreboard);
