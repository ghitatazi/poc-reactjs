import { SELECT_FEED, INVALIDATE_FEED, REQUEST_DATAPOINTS, RECEIVE_DATAPOINTS, REQUEST_LAST_VALUE, RECEIVE_LAST_VALUE, FIRE_ROUTE_TRANSITION  } from '../constants/actions/ActionConstants';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import getCookie from '../utilities/getCookie';

export const selectFeed = (feed) => {
  return {
    type: SELECT_FEED,
    feed,
  };
};

export const invalidateFeed = (feed) => {
  return {
    type: INVALIDATE_FEED,
    feed,
  };
};

export const requestDatapoints = (feed) => {
  return {
    type: REQUEST_DATAPOINTS,
    feed,
  };
};

export const receiveDatapoints = (feed, json) => {
  // here apply the DatapointsFormatter on the data
  return {
    type: RECEIVE_DATAPOINTS,
    feed,
    datapoints: json,
    receivedAt: Date.now(),
  };
};

export const requestLastValue = (feed) => {
  return {
    type: REQUEST_LAST_VALUE,
  };
};

export const receiveLastValue = (feed, json) => {
  return {
    type: RECEIVE_LAST_VALUE,
    feed,
    lastValue: json,
  };
};

// Thunk action creator : here a function is returned instead of an action obj
// the fct is executed by the redux-thunk middleware to exec async API calls
// it is used just like any other action creator: store.dispatch(fetchFeeds())
export const fetchDatapoints = (feed) => {
  // dispatch passed as args to make the fct able to dispatch actions itself
  return (dispatch) => {
    // First dispatch: the app state is updated to inform that the API call is starting
    dispatch(requestDatapoints(feed));
    // the fct called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.
    // In this case, we return a promise to wait for.
    // it is not required by thunk middleware
    return fetch(`/api/v1/datapoints/?feed=${feed}`, {
      method: 'get',
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(json => dispatch(receiveDatapoints(feed, json)));
    // catch any error in the network call
    // => voir implementation => dispatch an action ERROR and change state in reducer
    // .catch(error => dispatch(receiveErrorServer(feed, error)))
    // OR .catch(error => dispatch(receiveErrorParse(feed, error)))
  };
};

export const shouldFetchDatapoints = (state, feed) => {
  const datapoints = state.rootReducer.datapointsByFeed[feed];
  // verif qu'il n'y a aucun datapoints en cache
  if (!datapoints) {
    return true;
  } else if (datapoints.isFetching) {
    return false;
  } else {
    return datapoints.didInvalidate;
  }
};

export const fetchDatapointsIfNeeded = (feed) => {
  // this is useful for avoiding a network request if a cached value is already available
  return (dispatch, getState) => {
    if (shouldFetchDatapoints(getState(), feed)) {
      return dispatch(fetchDatapoints(feed));
    } else {
      // let the calling code know there's nothing to wai for
      return Promise.resolve();
    }
  };
};

export const getLastValue = (feed) => {
  console.log('action REQUEST_LAST_VALUE');
  return (dispatch) => {
    dispatch(requestLastValue(feed));
    return fetch(`/api/v1/feeds/${feed}/last`, {
      method: 'get',
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(json => dispatch(receiveLastValue(feed, json)));
  };
};

export const routeLocationDidUpdate = (location) => {
  console.log('action ROUTE_TRANSITION');
  return {
    type: FIRE_ROUTE_TRANSITION,
    location,
  };
};
