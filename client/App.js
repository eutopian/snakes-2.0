import fetch from 'isomorphic-fetch';
import React, {Component} from 'react';
import GameList from './components/GameList';
// import Head from './Head';
// import Body from './Body';
// import Apple from './Apple';

let gameStore = [];

function getInitialState() {
  return {
    rows: 20,
    columns: 20,
    speed: 300,
    highScore: 0,
    snake: {
      body: [],
      size: 1,
      direction: 'r',
      lost: false,
      paused: false
    },
    gameList: gameStore
  };
};

function fetchGames() {
  return fetch('/games')
    .then(response => response.json());
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState()
    // this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    fetchGames()
      .then(gameList => {
        gameStore = gameList;
        this.setState(
          { gameList: gameStore }
        );
      });
  }
  render () {
    return (
      <div>
        <p>My new snakes</p>


        
        { this.state.gameList && <GameList gameList={this.state.gameList} /> }
      </div>
    );
  }
}

export default App;
