import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

import rootReducer from '../reducers/reducers';
import { routerReducer } from 'react-router-redux';

// import sagaMonitor from '../tests/sagaMonitor';

/* factory functions to create middlewares exported from libraries */
const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware(); // use an option if needed: { sagaMonitor }

/* the fct instrument() returns a store enhancer => enhances the behavior of createStore() */
const enhancer = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware, sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const mainReducers = combineReducers({
  rootReducer,
  routing: routerReducer,
});

export default function configureStore(initialState) {
  let store = createStore(
    mainReducers,
    enhancer);
  return {
    store,
    runSaga: sagaMiddleware.run,
  };
}

/*
Rem:
  thunkMiddleware = dispatch() functions as action actors
  loggerMiddleware = neat middleware that logs actions
  sagaMiddleware to trigger a periodic action by a saga (generator function)
*/

/*
Rem redux-saga:
Steps:
import our Saga, create a middleware, connect our middleware to the Store
using ApplyMiddleware, then use sagaMiddleware.run() to start our Saga
our worker Saga will perform the async getLastValue for the selected feed
*/
