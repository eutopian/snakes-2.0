import React from 'react';
import Cell from './Cell';

const Board = (props) => {
  let rows = [];
    for ( let i = 0; i < props.rows; i++ ) {
      let columns = [];
      for ( let j = 0; j < props.columns; j++ ) {
        columns.push(<Cell key={j} snake={props.snake} apple={props.apple} myPos={[j, i]}/>);
      }
      rows.push(<tr key={i}>{columns}</tr>);
    }

  return (
    <div id="board">
    <table><tbody>{rows}</tbody></table>
    </div>
  );
};

export default Board;
