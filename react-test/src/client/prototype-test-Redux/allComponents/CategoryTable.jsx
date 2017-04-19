
import React, { Component } from 'react';

class CategoryTable extends Component {
  render() {
    return (
      <tr>
        <th colSpan="3">{this.props.category}</th>
      </tr>
    );
  }
}

CategoryTable.propTypes = {
  category: React.PropTypes.string,
};

export default CategoryTable;


