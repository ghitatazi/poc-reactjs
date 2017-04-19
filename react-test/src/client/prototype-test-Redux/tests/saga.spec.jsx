
import test from 'tapes';
import { runGaugeInstantValSaga, wait, ONE_SECOND } from '../utilities/sagas';
import { take, call } from 'redux-saga'; // add put
import { ActionConstants } from '../constants/actions/ActionConstants';
// import * as actions from '../actions/ActionsHandler';

test('runGaugeInstantVal Saga test', (assert) => {
  const generator = runGaugeInstantValSaga();
  assert.deepEqual(
    generator.next().value,
    take(ActionConstants.REQUEST_LAST_VALUE),
    'Saga must detect the action REQUEST_LAST_VALUE'
  );

  assert.deepEqual(
    generator.next().value,
    call(wait, ONE_SECOND),
    'Saga must call delay(1000)'
  );

  // if didInvalidate === false
  // assert.deepEqual(
  //   generator.next().value,
  //   put())
  //   ''
  // )
  assert.deepEqual(
    generator.next(),
    { done: true, value: undefined },
    'Saga must be done'
  );
});


/*
Rem:
What happens is that the middleware examines the type of each yielded Effect
then decides how to fulfill that Effect.
If the Effect type is a PUT then it will dispatch an action to the Store.
If the Effect is a CALL then it'll call the given function.
Ex: call(delay, 1000)        // => { CALL: {fn: delay, args: [1000]}}

gen.next() // => { done: false, value: <result of calling first yield> }
...
gen.next() // => { done: true, value: undefined } (last one - no more yield called)
*/

/*
Rem:
Lancer le test : CLI => 'tapes ...'
*/
