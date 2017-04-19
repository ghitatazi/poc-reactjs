import React from 'react';
import BarChart from '../containers/BarChart';
import { barChartOptions } from '../constants/charts/OptionsDefinition';

export default () => {
  return (
    <div>
      <BarChart options={barChartOptions} />
    </div>
  );
};
