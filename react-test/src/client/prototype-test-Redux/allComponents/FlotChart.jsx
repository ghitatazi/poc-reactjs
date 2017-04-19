
import React, { Component } from 'react';
import { getTimeSerie } from '../actions/ActionsHandler';
import { divStyle } from '../constants/css-styles/main';
import TimeSerieStore from '../stores/TimeSerieStore';
import 'jquery-flot/jquery.flot';
import 'jquery-flot/jquery.flot.symbol';
import 'jquery-flot/jquery.flot.time';

class FlotChart extends Component {
  constructor(props) {
    super(props);
    this.renderChart = this.renderChart.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = TimeSerieStore.getSerie();
  }

  componentDidMount() {
    TimeSerieStore.addChangeListener(this.onChange);
    getTimeSerie();
  }

  componentWillReceiveProps(nextProps) {
    // called to see if the component is receiving props
    console.log('Component is receiving props');
    console.log('nextProps: ', nextProps);
  }

  componentWillUnmount() {
    TimeSerieStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(TimeSerieStore.getSerie());
    this.renderChart();
  }

  renderChart() {
    const chartDiv = this.refs.chartDiv;
    const chartData = [this.state.serie[0]];
    const chartOptions = this.props.options;
    $.plot(chartDiv, chartData, chartOptions);
  }

  render() {
    return (
      <div className="flotChart" ref="chartDiv" style={divStyle}></div>
    );
  }
}

 /* Add properties validation: only DEVELOPMENT MODE ! */
FlotChart.propTypes = {
  options: React.PropTypes.object,
};

export default FlotChart;
