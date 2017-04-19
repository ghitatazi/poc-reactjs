
import { connect } from 'react-redux';
import { fetchDatapointsIfNeeded, selectFeed, invalidateFeed, getLastValue } from '../actions/ActionsHandler';
import GetFeedForm from '../components/GetFeedForm';

const mapStateToProps = (state, ownProps) => {
  return {
    location: ownProps.location,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetDataClick: (e, inputValue, location) => {
      e.preventDefault();
      dispatch(selectFeed(inputValue));
      if (location === '/') {
        dispatch(fetchDatapointsIfNeeded(inputValue));
      } else if (location === '/instant') {
        dispatch(getLastValue(inputValue));
      }
    },
    onRefreshDatapoints: (e, inputValue) => {
      e.preventDefault();
      dispatch(invalidateFeed(inputValue));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetFeedForm);
