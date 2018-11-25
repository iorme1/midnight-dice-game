import React, { Component } from 'react';
import dollarConverter from '../utils/dollarConverter';
import { setPlayers, setStakes } from '../actions/optionActions';
import { connect } from 'react-redux';
import {
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
      
      this.props.setPlayers(value);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    // Close modal
    this.toggle();
  }

  render() {
    return  (
      <div>
        <Button
          color="dark"
          className="m-5"
          onClick={this.toggle}
        >
          OPTIONS
        </Button>
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
                  Start Game
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
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
