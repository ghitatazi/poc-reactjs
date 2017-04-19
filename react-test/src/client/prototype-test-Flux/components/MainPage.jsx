import React from 'react';
// import FlotChart from './FlotChart';
// import Timer from './Timer';
import DisplayData from './DisplayData';
import BarChart from './BarChart';
import SolidGaugeComponent from './SolidGauge';
import { barChartOptions, gaugeOptions } from '../constants/charts/OptionsDefinition';
import { titleStyle } from '../constants/css-styles/main';

export default () => {
  return (
    <div>
      <p style={titleStyle} >This is a React.js test !</p>
      {/* <FlotChart options={flotChartOptions} /> */}
      {/* <Timer start={Date.now()} /> */}
      <DisplayData />
      <BarChart options={barChartOptions} />
      <SolidGaugeComponent options={gaugeOptions} />
    </div>
  );
};
