import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';

class Pot extends Component {
  render() {
    const { pot } = this.props.game;

    return (
      <div className="text-center mt-2 mb-4 pot-money">
        <h2>
          <FontAwesomeIcon
           icon={faMoneyBillAlt}
           className="mr-2"
           >
          </FontAwesomeIcon>
          <span>
            ${pot}
          </span>
        </h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game
});

export default connect(mapStateToProps, {})(Pot);
