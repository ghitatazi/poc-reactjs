import React, { Component } from 'react';
import CategoryTable from './CategoryTable';
import FeedRow from './FeedRow';
import TimeSerieStore from '../stores/TimeSerieStore';
import { getFeeds } from '../actions/ActionsHandler';

class DisplayData extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = TimeSerieStore.getFeeds();
    this.timer = '';
  }

  componentDidMount() {
    TimeSerieStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    TimeSerieStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(TimeSerieStore.getFeeds());
  }

  render() {
    let rows = [];
    const categoryName = 'Flux existants';
    this.state.feeds.forEach(feed => {
      rows.push(<FeedRow id={feed.id} name={feed.name} description={feed.description} key={feed.name} />);
    });
    if (rows.length > 0) {
      return (
        <table style={{ marginLeft: '35px' }}>
          <thead>
            <CategoryTable category={categoryName} />
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    } else {
      return <p>\_(ツ)_/¯</p>;
    }
  }
}

export default DisplayData;
