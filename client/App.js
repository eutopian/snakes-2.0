import fetch from 'isomorphic-fetch';
import React, {Component} from 'react';
import GameList from './components/GameList';
import Board from './components/Board';
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
    this.updateConfig = this.updateConfig.bind(this)
  }

  updateConfig(ev) {
    ev.stopPropagation();
    this.setState({
      speed: this.refs.speed.value,
      rows: this.refs.rows.value,
      columns: this.refs.columns.value,
    });
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
        
        <Board rows={this.state.rows} columns={this.state.columns} snake={this.state.snake} cookie={this.state.cookie}/>
        {this.state.lost ? <div className="lost">You lost. <button ref="restart" onClick={this.restart}>restart?</button></div> : null}
        {this.state.paused ? <div>paused. spacebar to unpause.</div> : <div>playing. spacebar to pause.</div>}
        <p>Score: {this.state.snake.size}. High score: {this.state.highScore}</p>
        <p>Feel free to leave the page in the middle of your game. It will still be here when you get back.</p>
        <form>
          <p>Settings</p>
          <label>Speed<input onChange={this.updateConfig} ref="speed" name="speed" value={this.state.speed} type="number" /></label>
          <label>Columns<input onChange={this.updateConfig} ref="columns" name="columns" value={this.state.columns} type="number" min="3" max="50"/></label>
          <label>Rows<input onChange={this.updateConfig} ref="rows" name="rows" value={this.state.rows} type="number" min="3" max="50"/></label>
        </form>

        { this.state.gameList && <GameList gameList={this.state.gameList} /> }
      </div>
    );
  }
}

export default App;
