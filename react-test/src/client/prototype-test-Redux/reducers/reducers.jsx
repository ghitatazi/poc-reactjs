
import { combineReducers } from 'redux';
import { ActionConstants } from '../constants/actions/ActionConstants';

const selectedFeed = (state = '1', action) => { // 1 correspond à l'id du flux 1
  switch (action.type) {
    case ActionConstants.SELECT_FEED:
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
    case ActionConstants.INVALIDATE_FEED:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case ActionConstants.REQUEST_DATAPOINTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case ActionConstants.RECEIVE_DATAPOINTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.datapoints,
        lastUpdated: action.receivedAt,
      });
    case ActionConstants.RECEIVE_LAST_VALUE:
      return Object.assign({}, state, {
        lastValue: [action.lastValue],
      });
    default:
      return state;
  }
};

const datapointsByFeed = (state = {}, action) => {
  switch (action.type) {
    case ActionConstants.INVALIDATE_FEED:
    case ActionConstants.REQUEST_DATAPOINTS:
    case ActionConstants.RECEIVE_DATAPOINTS:
    case ActionConstants.RECEIVE_LAST_VALUE:
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
