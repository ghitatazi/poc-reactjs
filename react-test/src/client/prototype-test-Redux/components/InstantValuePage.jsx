import React from 'react';
import SolidGaugeComponent from '../containers/SolidGaugeComponent';
import { gaugeOptions } from '../constants/charts/OptionsDefinition';

export default () => {
  return (
    <div>
      <SolidGaugeComponent options={gaugeOptions} />
    </div>
  );
};
