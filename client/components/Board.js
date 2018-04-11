import React from 'react';
import Cell from './Cell';

const Board = (props) => {
  var rows = [];
    for ( var i = 0; i < props.rows; i++ ) {
      var columns = [];
      for ( var j = 0; j < props.columns; j++ ) {
        columns.push(<Cell key={j} snake={props.snake} cookie={props.cookie} myPos={[j, i]}/>);
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
