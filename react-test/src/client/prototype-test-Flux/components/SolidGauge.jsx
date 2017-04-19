
import React, { Component } from 'react';
import { gaugeStyle, containerGaugeStyle } from '../constants/css-styles/main';
import { renderToString } from 'react-dom/server';
import DataLabels from './DataLabels';
import TimeSerieStore from '../stores/TimeSerieStore';
import { getInstantVal } from '../actions/ActionsHandler';
import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more';
import SolidGauge from 'highcharts-solid-gauge';

// we tell HighchartsMore to use the same Highcharts object as ReactHighcharts
HighchartsMore(ReactHighcharts.Highcharts);
SolidGauge(ReactHighcharts.Highcharts);


class SolidGaugeComponent extends Component {
  constructor(props) {
    super(props);
    this.updateOptions = this.updateOptions.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      options: this.props.options,
    };
  }

  componentDidMount() {
    TimeSerieStore.addChangeListener(this.onChange);
    this.updateOptions(null);
    this.timer = setInterval(getInstantVal, 3000);
  }

  componentWillUnmount() {
    TimeSerieStore.removeChangeListener(this.onChange);
    clearInterval(this.timer);
  }

  onChange() {
    const instantVal = TimeSerieStore.getLastValue();
    const gaugeRef = this.refs.gaugeComp;
    const chart = gaugeRef.chart;
    let newVal = 0;

    if (instantVal) {
      if (instantVal[0]) {
        newVal = parseInt(instantVal[0][0].value, 10);
      }
    }
    if (chart) {
      const min = chart.series[0].yAxis.min;
      const max = chart.series[0].yAxis.max;
      if (this.state.last < min || this.state.last > max) {
        newVal = 0;
      }
      this.updateOptions(newVal);
    }
  }

  updateOptions(newValue) {
    const unit = 'kWh';
    const opt = this.state.options;
    opt.series[0].dataLabels = {};
    opt.series[0].dataLabels.formatter = function formatDataLabels() {
      return (
        renderToString(<DataLabels unit={unit} value={this.y} />)
      );
    };
    opt.series[0].tooltip = {};
    opt.series[0].valueSuffix = unit;
    // update value
    if (newValue !== null && newValue !== 0) {
      opt.series[0].data[0] = newValue;
    }
    this.setState({ options: opt });
  }

  render() {
    return (
      <div style={containerGaugeStyle} >
        <ReactHighcharts style={gaugeStyle} config={this.state.options} ref="gaugeComp"></ReactHighcharts>
      </div>
    );
  }
}

SolidGaugeComponent.propTypes = {
  options: React.PropTypes.object,
  modules: React.PropTypes.object,
};

export default SolidGaugeComponent;

