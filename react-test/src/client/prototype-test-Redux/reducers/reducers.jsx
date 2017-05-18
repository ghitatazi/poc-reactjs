
import { combineReducers } from 'redux';
import { SELECT_FEED, INVALIDATE_FEED, REQUEST_DATAPOINTS, RECEIVE_DATAPOINTS, RECEIVE_LAST_VALUE } from '../constants/actions/ActionConstants';

const selectedFeed = (state = '1', action) => { // 1 correspond à l'id du flux 1
  switch (action.type) {
    case SELECT_FEED:
      return action.feed;
    default:
      return state;
  }
};

const datapoints = (state = {
  lastValue: [],
  isFetching: false,
  didInvalidate: false,
  items: [] }
  , action) => {
  switch (action.type) {
    case INVALIDATE_FEED:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_DATAPOINTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_DATAPOINTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.datapoints,
        lastUpdated: action.receivedAt,
      });
    case RECEIVE_LAST_VALUE:
      return Object.assign({}, state, {
        lastValue: [action.lastValue],
      });
    default:
      return state;
  }
};

const datapointsByFeed = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_FEED:
    case REQUEST_DATAPOINTS:
    case RECEIVE_DATAPOINTS:
    case RECEIVE_LAST_VALUE:
      return Object.assign({}, state, {
        [action.feed]: datapoints(state[action.feed], action),
      });
    default:
      return state;
  }
};

// ici feature ES6: key names and value names are the same
// associate key of state to reducer definition method
const rootReducer = combineReducers({
  datapointsByFeed,
  selectedFeed,
});

export default rootReducer;
