
import React, { Component } from 'react';
import BarChartTooltip from '../components/BarChartTooltip';
import { barChartStyle } from '../constants/css-styles/main';
import Highcharts from 'highcharts';
import 'highcharts/modules/exporting';
import { renderToString } from 'react-dom/server';
import datapointsFormatter from '../processors/BarChartSerieFormatter';
import Spinner from '../components/Spinner';
import { connect } from 'react-redux';
import { fetchDatapoints, fetchDatapointsIfNeeded } from '../actions/ActionsHandler';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.renderChart = this.renderChart.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.renderMsgToUser = this.renderMsgToUser.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedFeed } = this.props;
    dispatch(fetchDatapoints(selectedFeed));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didInvalidate && nextProps.selectedFeed === this.props.selectedFeed) {
      const { dispatch, selectedFeed } = nextProps;
      dispatch(fetchDatapointsIfNeeded(selectedFeed));
    }
    else if (nextProps.didInvalidate && nextProps.selectedFeed !== this.props.selectedFeed) {
      this.renderMsgToUser('Hit the Get datapoints button first!');
    }
    else if (nextProps.isFetching) {
      this.renderSpinner();
    }
    else if (nextProps.items.length !== 0) {
      const { selectedFeed, isFetching, didInvalidate, items } = nextProps;
      this.renderChart(selectedFeed, isFetching, didInvalidate, items);
    }
    else if (nextProps.selectedFeed !== this.props.selectedFeed) {
      const { dispatch, selectedFeed } = nextProps;
      dispatch(fetchDatapointsIfNeeded(selectedFeed));
    }
    else {
      this.renderMsgToUser('No data for feed selected');
    }
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  renderMsgToUser(msg) {
    const chartDiv = this.refs.barChartDiv;
    $(chartDiv).empty();
    $(chartDiv).prepend(`<p style="margin-left:35px;">${msg}</p>`);
  }

  renderSpinner() {
    const chartDiv = this.refs.barChartDiv;
    $(chartDiv).empty();
    $(chartDiv).prepend(renderToString(<Spinner />));
  }

  renderChart(selectedFeed, isFetching, didInvalidate, items) {
    const chartDiv = this.refs.barChartDiv;
    if (items.length !== 0) {
      const result = datapointsFormatter(items, selectedFeed);
      const chartOptions = this.props.options;
      $(chartDiv).empty();
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
  }

  render() {
    return (
      <div ref="barChartDiv" style={barChartStyle} ></div>
    );
  }
}

BarChart.propTypes = {
  options: React.PropTypes.object.isRequired,
  selectedFeed: React.PropTypes.string.isRequired,
  items: React.PropTypes.array.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  didInvalidate: React.PropTypes.bool.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { rootReducer } = state;
  const { selectedFeed, datapointsByFeed } = rootReducer;
  const {
    isFetching,
    didInvalidate,
    items,
  } = datapointsByFeed[selectedFeed] || {
    isFetching: false,
    didInvalidate: false,
    items: [],
  };
  return {
    selectedFeed,
    items,
    isFetching,
    didInvalidate,
  };
};

export default connect(
  mapStateToProps
)(BarChart);
