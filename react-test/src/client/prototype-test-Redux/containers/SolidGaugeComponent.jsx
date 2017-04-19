
import React, { Component } from 'react';
import { gaugeStyle, containerGaugeStyle } from '../constants/css-styles/main';
import { renderToString } from 'react-dom/server';
import DataLabels from '../allComponents/DataLabels';
import { getLastValue } from '../actions/ActionsHandler';
import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more';
import SolidGauge from 'highcharts-solid-gauge';
import { connect } from 'react-redux';

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
    const { dispatch, selectedFeed } = this.props;
    dispatch(getLastValue(selectedFeed));
  }

  componentWillReceiveProps(nextProps) {
    // mettre condition pour voir s'il s'agit du selectedFeed
    if (nextProps.lastValue.length !== 0 && this.props.lastValue.length !== 0) {
      if (nextProps.lastValue[0].value !== this.props.lastValue[0].value) {
        // vérifier que lastValue a changé
        const { lastValue } = nextProps;
        this.onChange(lastValue);
      }
    } else {
      const { lastValue } = nextProps;
      this.onChange(lastValue);
    }
  }

  onChange(lastValue) {
    const gaugeRef = this.refs.gaugeComp;
    const chart = gaugeRef.chart;
    let newVal = 0;

    if (lastValue) {
      if (lastValue[0]) {
        newVal = parseInt(lastValue[0].value, 10);
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
      <div style={containerGaugeStyle} ref="gaugeDiv" >
        <ReactHighcharts
          style={gaugeStyle}
          config={this.state.options}
          ref="gaugeComp">
        </ReactHighcharts>
      </div>
    );
  }
}

SolidGaugeComponent.propTypes = {
  options: React.PropTypes.object.isRequired,
  lastValue: React.PropTypes.array.isRequired,
  selectedFeed: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { rootReducer } = state;
  const { selectedFeed, datapointsByFeed } = rootReducer;
  const {
    lastValue,
  } = datapointsByFeed[selectedFeed] || {
    lastValue: [],
  };
  return {
    selectedFeed,
    lastValue,
  };
};

export default connect(
  mapStateToProps
)(SolidGaugeComponent);

