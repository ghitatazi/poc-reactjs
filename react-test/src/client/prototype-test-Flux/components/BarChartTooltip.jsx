import React, { Component } from 'react';

class BarChartTooltip extends Component {

  componentWillReceiveProps(nextProps) {
    // called to see if the component is receiving props
    console.log('Component is receiving props');
    console.log('nextProps: ', nextProps);
    this.firstTdStyle = {
      color: nextProps.color,
      padding: 0,
    };
  }

  render() {
    return (
      <div>
        <span style={{ fontSize: '10px' }}></span>
        <table>
          <tbody>
            <tr>
              <td style={{ color: this.props.color, padding: 0 }}>{this.props.name}: </td>
              <td style={{ padding: 0 }}><b>{this.props.y}</b></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

BarChartTooltip.propTypes = {
  name: React.PropTypes.string,
  y: React.PropTypes.number,
  color: React.PropTypes.string,
};

export default BarChartTooltip;
