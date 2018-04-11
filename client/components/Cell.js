import React from 'react';

const Cell = (props) => {
  let isActive = false;
  let isCookie = false;
  for (let k = 0; k < props.snake.length; k++ ) {
    isActive |= _.isEqual(props.snake[k], props.myPos);
    isCookie |= _.isEqual(props.cookie, props.myPos);
  }

  return (
    <div id="cell">
      <p>I'm a cell</p>
    </div>
  );
};

export default Cell;
