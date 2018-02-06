import centerReducer from '../../client/src/reducers/singleCenter';
import MockAdapter from 'axios-mock-adapter';
import { call, put, take } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from "redux-saga-test-plan/providers";
import axios from 'axios';
import { watchGetSingle } from '../../client/src/Sagax/saga';



describe('Test Sagas ', () => {

  it('gets a single center', () => {
    // const action = { index: 42 };
    const response = { data: {
        center: {
          id: 1, name: 'John Smith'
        }
      }
    };

    return expectSaga(watchGetSingle)
      //call reducer
      .withReducer(centerReducer)

      .provide([[call(axios.get, '/api/v1/centers/42'), response]])
      // Assert that the `put` will eventually happen.
      .put({ type: 'SET_SINGLE', response: {center: { id: 1, name: 'John Smith' }} })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'GET_SINGLE', index: 42 })

      .hasFinalState({id: 1, name: 'John Smith'})
      // Start the test. Returns a Promise.
      .run();
  });
});

