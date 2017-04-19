import React from 'react';
const Highcharts = require('highcharts');

const divStyle = {
  textAlign: 'center',
};

const firstSpanStyle = {
  fontSize: '25px',
  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
};

const secondSpanStyle = {
  fontSize: '12px',
  color: 'silver',
};

export default ({ unit, value }) => {
  return (
    <div style={divStyle}>
      <span style={firstSpanStyle} >{value}</span>
      <br />
      <span style={secondSpanStyle}>{unit}</span>
    </div>
  );
};
