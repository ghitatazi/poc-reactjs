
import React, { Component } from 'react';

class FeedRow extends Component {
  render() {
    const name = <span style={{ color: 'red' }}>{this.props.name}</span>;
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{name}</td>
        <td>{this.props.description}</td>
      </tr>
    );
  }
}

FeedRow.propTypes = {
  id: React.PropTypes.number,
  name: React.PropTypes.string,
  description: React.PropTypes.string,
};

export default FeedRow;
