import fetch from 'isomorphic-fetch';
import React, {Component} from 'react';
import GameList from './components/GameList';
import Board from './components/Board';
import { isEqual, some, max } from 'underscore';

function getInitialSnake() {
  let snakeHead = [randint(50), randint(50)]
  let snake = []
  snake.push(snakeHead)
  snake.push([snakeHead[0]+1, snakeHead[1]])
  snake.push([snakeHead[0]+2, snakeHead[1]])
  snake.push([snakeHead[0]+3, snakeHead[1]])
  return snake
}

function getInitialState() {
  return {
    rows: 50,
    columns: 50,
    speed: 200,
    highScore: 0,
    snake: getInitialSnake(),
    apple: null,
    direction: 'r',
    lost: false,
    paused: false,
    gameList: []
  };
};

function fetchGames() {
  return fetch('/games')
    .then(response => response.json());
}

function randint(n) {
  return Math.floor(n * Math.random());
}

function move(snake, direction, lengthen) {
  snake = snake.slice();
  var head = last(snake).slice();
  if ( direction === 'r' )
    head[0] += 1;
  else if ( direction === 'l' )
    head[0] -= 1;
  else if ( direction === 'd' )
    head[1] += 1;
  else if ( direction === 'u' )
    head[1] -= 1;
  if ( snake.length > 1 && isEqual(head, snake[snake.length - 2]) ) {
    return null;
  }
  snake.push(head);

  if ( ! lengthen )
    snake.shift();
  return snake;
}

function last(ary) {
  return ary[ary.length - 1];
}

function isOverlapping(snake) {
  for ( var i = 0; i < snake.length - 1; i++ ) {
    if ( isEqual(snake[i], last(snake)) )
      return true;
  }
  return false;
}

function isOnBoard(pos, rows, columns) {
  return !(pos[0] < 0 || pos[0] >= columns || pos[1] < 0 || pos[1] >= rows);
}

//

class App extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState()
    this.updateConfig = this.updateConfig.bind(this)
    this.tick = this.tick.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.newApplePosition = this.newApplePosition.bind(this)
    this.score = this.score.bind(this)
    this.restart = this.restart.bind(this)
  }

  updateConfig(ev) {
    ev.stopPropagation();
    this.setState({
      speed: this.refs.speed.value,
      rows: this.refs.rows.value,
      columns: this.refs.columns.value,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    document.body.removeEventListener('keydown', this.onKeyDown);
  }

  componentDidUpdate() {
    localStorage.snakeState = JSON.stringify(this.state);
  }

  componentDidMount() {
    this.tick();
    document.body.addEventListener('keydown', this.onKeyDown);
    fetchGames()
      .then(gameList => {
        this.setState(
          { gameList: gameList }
        );
      });
  }

  score() {
    return this.state.snake.length;
  }

  restart() {
    this.setState(getInitialState(), () => { this.forceUpdate(); this.tick(); });
  }

  tick() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.tick, this.state.speed);

    if ( this.state.paused || this.state.lost )
      return;

    let apple, snake;
    if ( ! this.state.apple ) {
      apple = this.newApplePosition();
    } else {
      apple = this.state.apple;
    }
     
    snake = move(this.state.snake, this.state.direction);
    if ( isOverlapping(snake) || !isOnBoard(last(snake), this.state.rows, this.state.columns) ) {
      this.setState({lost: true});
      return;
    }
    if ( isEqual(snake[snake.length-1], apple) ) {
      snake = move(this.state.snake, this.state.direction, true);
      this.setState({
        snake: snake
      }, () => {
        this.setState({
          highScore: max([this.state.highScore, this.score()]),
          apple: this.newApplePosition(),
        })
      });
    }

    this.setState({snake: snake}, () => {
      if (! this.state.apple )
        this.setState({apple: this.newApplePosition()});
    });
  }

  onKeyDown(event) {
    event.preventDefault();
    if ( this.state.lost )
      return;

    if ( event.which == 32 ) {
      this.setState({paused: !this.state.paused});
      return;
    } else if ( this.state.paused ) {
      return;
    }

    var direction = null;
    if ( event.which == 37 || event.which == 72 ) // h
      direction = 'l';
    else if ( event.which == 40 || event.which == 74 ) // j
      direction = 'd';
    else if ( event.which == 38 || event.which == 75 ) // k
      direction = 'u';
    else if ( event.which == 39 || event.which == 76 ) // l
      direction = 'r';

    if ( direction && move(this.state.snake, direction) ) {
      this.setState({direction: direction});
      this.tick();
    }
  }

  newApplePosition() {
    if ( this.state.snake.length == this.state.rows * this.state.columns ) {
      alert('There is no place for another apple! You win!');
      this.setState({paused: true});
      return;
    }
    do {
      var apple = [randint(this.state.columns), randint(this.state.rows)];
    } while ( some(this.state.snake, (i) => isEqual(i, apple)) );
    return apple;
  }

  render () {
    return (
      <div>
        <p>My new snakes</p>
        
        <Board rows={this.state.rows} columns={this.state.columns} snake={this.state.snake} apple={this.state.apple}/>
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
