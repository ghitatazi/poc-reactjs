
import React from 'react';

const spinner = {
  display: 'inline-block',
  opacity: 0,
  width: 0,
  // -webkit-transition: opacity 0.25s, width 0.25s;
  // -moz-transition: opacity 0.25s, width 0.25s;
  // -o-transition: opacity 0.25s, width 0.25s;
  // transition: opacity 0.25s, width 0.25s;
};

export default () => {
  return (
    <span style={spinner}><i className="icon-spin icon-refresh"></i>Loading...</span>
  );
};
