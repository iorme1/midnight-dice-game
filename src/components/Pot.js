import React, { Component } from 'react';
import { connect } from 'react-redux';


class Pot extends Component {
  render() {
    const { pot } = this.props.game;

    return (
      <div className="text-center mt-5">
        <h1>
          <span style={{color: '#85bb65' }}>POT: ${pot}</span>
        </h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game
});

export default connect(mapStateToProps, {})(Pot);
