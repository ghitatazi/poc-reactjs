import { call, put, select, take, race } from 'redux-saga/effects'; // fork
import { delay } from 'redux-saga'; // takeEvery
import { ActionConstants } from '../constants/actions/ActionConstants';
import * as actions from '../actions/ActionsHandler';

export const NB_SECONDS = 3000;

/* selectors of the store's state */
const getSelectedFeed = state => state.rootReducer.selectedFeed;
const getDataFromSpecificFeed = (state, args) => {
  const arr = Object.keys(args).map((k) => args[k]);
  const internalState = state.rootReducer;
  if (internalState.datapointsByFeed) {
    if (arr[0] in internalState.datapointsByFeed) {
      const feedparams = internalState.datapointsByFeed[arr[0]];
      const didInvalidateVal = feedparams[arr[1]];
      return didInvalidateVal;
    }
  }
};

function* getLastValueBackground(selectedFeed) {
  yield call(delay, NB_SECONDS);
  yield put(actions.getLastValue(selectedFeed));
}

export function* runGaugeInstantValSaga() {
  while (yield take(ActionConstants.REQUEST_LAST_VALUE)) {
    console.log('SAGA STARTED');
    const selectedFeed = yield select(getSelectedFeed);
    while (true) {
      const { transition } = yield race({
        lastValueIt: call(getLastValueBackground, selectedFeed),
        transition: take(ActionConstants.FIRE_ROUTE_TRANSITION),
      });
      if (transition) {
        console.log('SAGA STOPPED');
        break;
      }
    }
  }
}

/*
yield* takeEvery('*', function* logger(action) {
  const state = yield select();
  console.log('action', action);
  console.log('state', state);
});
const { response, cancel } = yield race({
  response: take(ActionConstants.REQUEST_LAST_VALUE),
  cancel: take(ActionConstants.FIRE_ROUTE_TRANSITION),
});
console.log('response: ');
console.log(response);
console.log('cancel: ');
console.log(cancel);
*/

/*
Rem:
A SAGA is a generator function that generally implements:
a watcher Saga: 'on each REQUEST_LAST_VALUE, do something' => take
a worker Saga: 'perform a task' => put
the generator YIELDS objects to the redux-saga middleware
= instructions to be interpreted by the middleware */

/*
Rem:
'delay' returns a promise that will resolve after a specified time
this fct is used to block the generator
when the MID retrieves a Promise object, it will suspend the Saga
(the generator fct) until the Promise completes
*/

/*
Rem:
'put' is one example of what we call an Effect.
Effects are simple JavaScript Objects which contain instructions to be fulfilled by the middleware.
When a middleware retrieves an Effect yielded by a Saga,
it pauses the Saga until the Effect is fulfilled, then the Saga is resumed again.
*/

/*
Rem:
To start multiple sagas at the same time
export default function* rootSaga() {
  yield [
    helloSaga(),
    watchIncrementAsync()
  ]
}
*/

/*
Rem très très importante:
It's important to note that when an action is dispatched to the store,
the middleware first forwards the action to the reducers and then notifies the Sagas.
This means that when you query the Store's State,
you get the State AFTER the action has been applied.
*/
