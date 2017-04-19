/* eslint-disable global-require */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import HistoryPage from './components/HistoryPage';
import InstantValuePage from './components/InstantValuePage';
import Squeleton from './components/Squeleton';
import { runGaugeInstantValSaga } from './utilities/sagas';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { routeLocationDidUpdate } from './actions/ActionsHandler';

const store = configureStore();
store.runSaga(runGaugeInstantValSaga);

const history = syncHistoryWithStore(browserHistory, store.store);

/* Create an action type that fires whenever the router location changes
and the store updates consequently */
history.listen(location => store.store.dispatch(routeLocationDidUpdate(location)));

const NotFound = () => (<h1>404... This page is not found !</h1>);

const Address = () => (<h3>Welcome to the Address page</h3>);

const About = (props) => (
  <div>
    <h3>Welcome to the About Page</h3>
    {props.params.company && <h2>Hello, {props.params.company}</h2>}
  </div>
);

render(
  <Provider store={store.store} >
    <Router history={history}>
      <Route path="/" component={Squeleton}>
        <IndexRoute component={HistoryPage} />
        <Route path="/instant" component={InstantValuePage} />
        <Route path="/address" component={Address} />
        <Route path="/about(/:company)" component={About} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

// Show DevTools in a separate window
// if (process.env.NODE_ENV !== 'production') {
//   const showDevTools = require('./showDevTools').default;
//   showDevTools(store);
// }

/* eslint-enable global-require */
