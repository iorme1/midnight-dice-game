import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import Scoreboard from './components/Scoreboard';
import GameModal from './components/GameModal';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar/>
          <GameModal/>
          <Scoreboard/>
        </div>
      </Provider>
    );
  }
}

export default App;
