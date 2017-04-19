import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

import rootReducer from '../reducers/reducers';
import { routerReducer } from 'react-router-redux';

// factory functions to create middlewares exported from libraries
const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware(); // use an option if needed: { sagaMonitor }

const enhancer = applyMiddleware(thunkMiddleware, loggerMiddleware, sagaMiddleware);
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
