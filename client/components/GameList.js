import React from 'react';
import PropTypes from 'prop-types';

const GameList = (props) => {
  const gameList = props.gameList;
  const listElements = gameList.map(user => (
    <li key={user.username}>{user.username} scored {user.highscore}</li> 
  ));
  
  return (
    <div id="gameList">
      <h3>Previous matches</h3>
      <ul>
        {listElements}
      </ul>
    </div>
  );
};

GameList.propTypes = {
  gameList: PropTypes.array.isRequired,
};

export default GameList;
