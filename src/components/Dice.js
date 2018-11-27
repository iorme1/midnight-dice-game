import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Dice extends Component {
  render() {

    const rollAnimation = 'animated rollIn';

    return (
      <div className="col-md-1 mt-5">
        <FontAwesomeIcon
          className={rollAnimation}
          icon={this.props.diceNumber}
          size="3x"
          color="white"
        />
      </div>
    );
  }
}

export default Dice;
