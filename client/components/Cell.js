import React from 'react';
import { isEqual } from 'underscore';
import classNames from 'classnames';

const Cell = (props) => {
  let isActive = false;
  let isApple = false;
    for ( var k = 0; k < props.snake.length; k++ ) {
      isActive |= isEqual(props.snake[k], props.myPos);
      isApple |= isEqual(props.apple, props.myPos);
    }

    var isRelated = (props.snake)[0] == props.myPos[0] ||
                    (props.snake)[1] == props.myPos[1];
    return <td className={classNames({active: isActive, apple: isApple, related: isRelated})}/>;
  }

export default Cell;
