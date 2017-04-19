
import React, { Component } from 'react';
import BarChartTooltip from './BarChartTooltip';
import TimeSerieStore from '../stores/TimeSerieStore';
import datapointsFormatter from '../processors/DatapointsFormatter';
import { getDatapoints } from '../actions/ActionsHandler';
import { barChartStyle } from '../constants/css-styles/main';
import Highcharts from 'highcharts';
import 'highcharts/modules/exporting';
import { renderToString } from 'react-dom/server';
import difference from 'lodash/difference';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.renderChart = this.renderChart.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = TimeSerieStore.getDatapoints();
    this.counter = 0;
  }

  componentDidMount() {
    TimeSerieStore.addChangeListener(this.onChange);
    getDatapoints();
  }

  componentWillUnmount() {
    TimeSerieStore.removeChangeListener(this.onChange);
    this.chart.destroy();
  }

  onChange() {
    const result = difference(this.state.datapoints, TimeSerieStore.getDatapoints().values);
    if (this.counter === 0 || result.length !== 0) {
      this.counter = 1;
      this.setState(TimeSerieStore.getDatapoints());
      this.renderChart();
    } else {
      return;
    }
  }

  renderChart() {
    const result = datapointsFormatter(this.state.values[0]);
    const chartDiv = this.refs.barChartDiv;
    const chartOptions = this.props.options;
    chartOptions.series = [result.serie];
    chartOptions.xAxis.categories = result.category;
    chartOptions.tooltip = {};
    chartOptions.tooltip.formatter = function formatTooltip() {
      return (
        renderToString(<BarChartTooltip name={this.series.name} color={this.series.color} y={this.y} />)
      );
    };
    this.chart = new Highcharts.Chart(chartDiv, chartOptions);
  }

  render() {
    return (
      <div ref="barChartDiv" style={barChartStyle}></div>
    );
  }
}

BarChart.propTypes = {
  options: React.PropTypes.object,
};

export default BarChart;

