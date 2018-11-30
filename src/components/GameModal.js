import React, { Component } from 'react';
import dollarConverter from '../utils/dollarConverter';
import { setPlayers, setStakes } from '../actions/optionActions';
import { connect } from 'react-redux';
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import PropTypes from 'prop-types';


class GameModal extends Component {
  state = {
     modal: true
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {
    let value = e.target.value

    if (value.includes("$")) {
      value = dollarConverter(value);
      this.props.setStakes(value);
    } else {
      value = parseInt(value);
      let players = [];
      let playerNumber = 1;

      while (playerNumber <= value) {
        let playerDetails = {
          id: playerNumber,
          profit: 0,
          selections: [],
          playedTurn: false
        };
        // Game is just starting here, player1 by default will be active first
        if (playerNumber === 1) playerDetails.active = "true";
        else playerDetails.active = "false";

        players.push(playerDetails);
        playerNumber+=1;
      }

      this.props.setPlayers(players);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    //  issue here where if for example you have 5 players, and u
    // open up the modal and by default it has 2 players selected
    // with $1 stake. If you just select apply selection it wont
    // change anything cuz the "onChange" won't run since you
    // haven't physically changed anything even though the default
    // of the selections are different than your current selections.
    // therefore I think something in the onSubmit should make the
    // changes rather than the onChange. OR make the default of
    // the select inputs be the same as the CURRENT state of the options.

    //closes modal
    this.toggle();
  }

  render() {
    return  (
      <Container>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
        <ModalHeader toggle={this.toggle}>Game Options</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
              <Label for="playercount">How many players?</Label>
              <Input
                type="select"
                name="playercount"
                id="playerSelect"
                className="mb-2"
                onChange={this.onChange}
              >
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </Input>
                <Label for="stakes">Pick your stakes</Label>
                <Input
                  type="select"
                  name="stakes"
                  id="stakeselect"
                  onChange={this.onChange}
                >
                  <option>$1</option>
                  <option>$2</option>
                  <option>$3</option>
                  <option>$4</option>
                  <option>$5</option>
                </Input>
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  type="submit"
                  block
                >
                  Apply Selections
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

GameModal.propTypes = {
  setStakes: PropTypes.func.isRequired,
  setPlayers: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  options: state.options
});


export default connect(mapStateToProps, { setStakes, setPlayers })(GameModal);
