import React from 'react';

let BarChartTooltip = ({ color, name, y }) => {
    return (
      <div>
        <span style={{ fontSize: '10px' }}></span>
        <table>
          <tbody>
            <tr>
              <td style={{ color: color, padding: 0 }}>{name}: </td>
              <td style={{ padding: 0 }}><b>{y}</b></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

BarChartTooltip.propTypes = {
  name: React.PropTypes.string.isRequired,
  y: React.PropTypes.number.isRequired,
  color: React.PropTypes.string,
};

export default BarChartTooltip;
