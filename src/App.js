import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import Scoreboard from './components/Scoreboard';
import GameModal from './components/GameModal';
import Roll from './components/Roll';
import StartRound from './components/StartRound';
import Pot from './components/Pot';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import './animate.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar/>
          <GameModal/>
          <StartRound/>
          <Roll/>
          <Pot/>
          <Scoreboard/>
        </div>
      </Provider>
    );
  }
}

export default App;
