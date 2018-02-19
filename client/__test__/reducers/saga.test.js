import centerReducer from '../../src/reducers/centers';
import loaderReducer from '../../src/reducers/loader';
import errorReducer from '../../src/reducers/error';
import singleReducer from '../../src/reducers/singleCenter';
import eventReducer from '../../src/reducers/events';
import userReducer from '../../src/reducers/user';
import MockAdapter from 'axios-mock-adapter';
import { call, put, take } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from "redux-saga-test-plan/providers";
import axios from 'axios';
import { getCenters, watchGetCenters,watchGetSingleEvent, watchSignUser,watchAddUser, watchAddCenter,
  watchUpdateCenter, watchGetEvents, watchDeleteEvent, watchRetrievePass, watchUpdateEvent, watchAddEvent } from '../../src/Sagax/saga';



describe('Test Sagas', () => {
  it('gets all available centers', () => {
    // const action = { index: 42 };
    const response = { data: {
        center: {
          id: 1, name: 'John Smith'
        }
      }
    };

    return expectSaga(watchGetCenters)
      //call reducer
      .withReducer(centerReducer)

      .provide([[call(axios.get, '/api/v1/centers?limit=42'), response]])
      // Assert that the `put` will eventually happen.
      .put({ type: 'GET_CENTER', response: {center: { id: 1, name: 'John Smith' }} })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'GET_ALL', index: 42 })

      .hasFinalState({id: 1, name: 'John Smith'})

      // Start the test. Returns a Promise.
      .run(3000);
  });

  it('adds center to the list of centers', () => {
    // const action = { index: 42 };
    localStorage.setItem('token', 'hello');
    const response = { data: {
        center: {
          id: 1, name: 'John Smith'
        }
      }
    };
    const action = {
      token: 'hello',
      name: 'John',
      description: 'awesome',
      capacity: 400,
      location: 'area 12',
      image: '/images/img.jsx',
      price: 24
    };
    return expectSaga(watchAddCenter)
      //call reducer
      .withReducer(centerReducer)

      .provide([[call(axios.post, '/api/v1/centers', action), response]])
      // Assert that the `put` will eventually happen.
      .put({ type: 'SET_CENTER', response: {center: { id: 1, name: 'John Smith' }} })

      .put({ type: 'ERROR', error: '' })

      .put({ type: 'UNLOAD' })

      .put({ type: 'SUCCESS'})

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'ADD_CENTER', payload: action })

      .hasFinalState([{id: 1, name: 'John Smith'}])

      // Start the test. Returns a Promise.
      .run(3000);
  });

  it('retrieves user password', () => {
    // const action = { index: 42 };
    localStorage.setItem('token', 'hello');
    const response = {
      data: {token: 'token'}
    };
    const action = {email: 'awesome'};
    return expectSaga(watchRetrievePass)

      .provide([[call(axios.post, '/api/v1/users/reset', action), response]])

      .put({ type: 'ERROR', error: '' })

      .put({ type: 'SUCCESS'})

      .put({ type: '!SUCCESS'})

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'RETRIEVE', email: 'awesome' })

      // Start the test. Returns a Promise.
      .run(3000);
  });

  it('adds user to the list of users', () => {
    // const action = { index: 42 };
    localStorage.setItem('token', 'hello');
    const response = {
      data: {token: 'token'}
    };
    const action = {
      username: 'John',
      email: 'awesome',
      password: 400,
    };
    return expectSaga(watchAddUser)
      //call reducer
      .withReducer(userReducer)

      .provide([[call(axios.post, '/api/v1/users/signup', action), response]])
      // Assert that the `put` will eventually happen.
      .put({ type: 'INCOMING_TOKEN', response: {token: 'token'}})

      .put({ type: 'ERROR', error: '' })

      .put({ type: 'UNLOAD' })

      .put({ type: 'SUCCESS'})

      .put({ type: '!SUCCESS'})

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'SIGN_UP', payload: action })

      .hasFinalState('')

      // Start the test. Returns a Promise.
      .run(3000);
  });

  it('signin authenticated user', () => {
    // const action = { index: 42 };
    localStorage.setItem('route', 'hello');
    const response = {
      data: {token: 'token'}
    };
    const action = {
      email: 'awesome',
      password: 400,
    };
    return expectSaga(watchSignUser)
      //call reducer
      .withReducer(userReducer)

      .provide([[call(axios.post, '/api/v1/users/signin', action), response]])
      // Assert that the `put` will eventually happen.
      .put({ type: 'INCOMING_TOKEN', response: {token: 'token'}})

      .put({ type: 'ERROR', error: '' })

      .put({ type: 'UNLOAD' })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'SIGN_IN', payload: action })

      .hasFinalState('')

      // Start the test. Returns a Promise.
      .run(3000);
  });

  it('updates centers', () => {
    const actione = { index: 42 };
    localStorage.setItem('token', 'hello');
    const response = { data: {
        center: {
          id: 1, name: 'John Smith'
        }
      }
    };
    const data = {
      token: 'hello',
      name: 'John',
      description: 'awesome',
      capacity: 400,
      location: 'area 12',
      image: '/images/img.jsx',
      price: 24
    };
    return expectSaga(watchUpdateCenter)
      //call reducer
      .withReducer(singleReducer)

      .provide([[call(axios.put, '/api/v1/centers/42', data), response]])
      // Assert that the `put` will eventually happen.
      .put({ type: 'SET_SINGLE', response: {center: { id: 1, name: 'John Smith' }} })

      .put({ type: 'ERROR', error: '' })

      .put({ type: 'UNLOAD' })

      .put({ type: 'SUCCESS'})

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'UPDATE_CENTER', payload: data, index: 42 })

      .hasFinalState({id: 1, name: 'John Smith'})

      // Start the test. Returns a Promise.
      .run(4000);
  });

  it('get all available events for a user', () => {
    localStorage.setItem('token', 'hello');
    const response = { data: {
        event: [{
          id: 1, name: 'John Smith'
        }]
      }
    };
    return expectSaga(watchGetEvents)
      //call reducer
      .withReducer(eventReducer)

      .provide([[call(axios.get, '/api/v1/events/user?token=hello'), response]])
      // Assert that the `put` will eventually happen.
      .put({ type: 'SET_EVENTS', response: {event: [{ id: 1, name: 'John Smith' }]} })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'GET_EVENTS' })

      .hasFinalState([{id: 1, name: 'John Smith'}])

      // Start the test. Returns a Promise.
      .run(3000);
  });

  it('+++ adds events to the list of events', () => {
    // const action = { index: 42 };
    localStorage.setItem('token', 'hello');
    const response = { data: {
        center: {
          id: 1, name: 'John Smith'
        }
      }
    };
    const data = {
      token: 'hello',
      name: 'John',
      type: 'awesome',
      time: 400,
      date: 'area 12',
      guests: '/images/img.jsx',
      title: 24
    };

    const action = {
      value: 'John',
      type: 'awesome',
      time: 400,
      date: 'area 12',
      guests: '/images/img.jsx',
      title: 24
    };
    return expectSaga(watchAddEvent)

      .provide([[call(axios.post, '/api/v1/events', data), response]])

      .put({ type: 'ERROR', error: '' })

      .put({ type: 'UNLOAD' })

      .put({ type: 'SUCCESS'})

      .put({ type: '!SUCCESS'})

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'ADD_EVENT', payload: action })

      // Start the test. Returns a Promise.
      .run(2000);
  });

  it('+++ updates events to the list of events', () => {
    // const action = { index: 42 };
    localStorage.setItem('token', 'hello');
    const response = { data: {
        center: {
          id: 1, name: 'John Smith'
        }
      }
    };
    const data = {
      token: 'hello',
      name: 'John',
      type: 'awesome',
      time: 400,
      date: 'area 12',
      guests: '/images/img.jsx',
      title: 24
    };

    const action = {
      center: 'John',
      type: 'awesome',
      time: 400,
      date: 'area 12',
      guests: '/images/img.jsx',
      title: 24
    };
    return expectSaga(watchUpdateEvent)

      .provide([[call(axios.put, '/api/v1/events/42', data), response]])

      .put({ type: 'ERROR', error: '' })

      .put({ type: 'UNLOAD' })

      .put({ type: 'SUCCESS'})

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'UPDATE_EVENT', payload: action, index: 42 })

      // Start the test. Returns a Promise.
      .run(3000);
  });

  it('+++ deletes events from the list of events', () => {
    // const action = { index: 42 };
    localStorage.setItem('token', 'hello');
    const response = {
       data: {
        message: 'deleted!'
      }
    };
    return expectSaga(watchDeleteEvent)

      .provide([[call(axios.delete, '/api/v1/events/42?token=hello'), response]])

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'DELETE_EVENT', index: 42 })

      // Start the test. Returns a Promise.
      .run(3000);
  });

  it('+++ gets a single events from the list of events', () => {
    // const action = { index: 42 };
    localStorage.setItem('token', 'hello');
    const response = {
       data: {
        message: 'deleted!'
      }
    };
    return expectSaga(watchGetSingleEvent)

      .provide([[call(axios.get, '/api/v1/events/single/42'), response]])

      // Assert that the `put` will eventually happen.
      .put({ type: 'SET_SINGLE_EVENT', response: {message: 'deleted!'} })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'GET_SINGLE_EVENT', index: 42 })

      // Start the test. Returns a Promise.
      .run(3000);
  });
});


describe('Error handler', () => {
  it('test for error handling in the signup', () => {
    // const action = { index: 42 };
    localStorage.setItem('token', 'hello');
    const response = {
      data: {token: 'token'}
    };
    const error = {response: {data: {message: 'error'}}};
    const action = {
      username: 'John',
      email: 'awesome',
      password: 400,
    };
    return expectSaga(watchAddUser)

      .provide([[call(axios.post, '/api/v1/users/signup', action),
       throwError(error)]])

      .put({ type: 'UNLOAD' })

      .put({ type: 'ERROR', error: 'error' })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'SIGN_UP', payload: action })

      // Start the test. Returns a Promise.
      .run();
  });

  it('test for error handling in RETRIEVING password', () => {
    const error = {response: {data: {message: 'error'}}};
    return expectSaga(watchRetrievePass)

      .provide([[call(axios.post, '/api/v1/users/reset', {email: 'awesome'}),
       throwError(error)]])

      .put({ type: 'ERROR', error: 'error' })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'RETRIEVE', email: 'awesome' })

      // Start the test. Returns a Promise.
      .run(3000);
  });

  it('test for error handling in the signin', () => {
    const action = {
      email: 'awesome',
      password: 400,
    };
    const error = {response: {data: {message: 'error'}}};
    return expectSaga(watchSignUser)

      .provide([[call(axios.post, '/api/v1/users/signin', action),
      throwError(error)]])

      .put({ type: 'ERROR', error: 'error' })

      .put({ type: 'UNLOAD' })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'SIGN_IN', payload: action })

      // Start the test. Returns a Promise.
      .run();
  });

  it('tests error handling in add center', () => {
    const action = {
      token: 'hello',
      name: 'John',
      description: 'awesome',
      capacity: 400,
      location: 'area 12',
      image: '/images/img.jsx',
      price: 24
    };
    const error = {response: {data: {message: 'error'}}};
    return expectSaga(watchAddCenter)
      //call reducer
      .withReducer(centerReducer)

      .provide([[call(axios.post, '/api/v1/centers', action), throwError(error)]])
      // Assert that the `put` will eventually happen.
      .put({ type: 'ERROR', error: 'error' })

      .put({ type: 'UNLOAD' })

      .put({ type: '!SUCCESS'})

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'ADD_CENTER', payload: action })

      .hasFinalState([])

      // Start the test. Returns a Promise.
      .run();
  });

  it('tests error handling in update center', () => {
    const actione = { index: 42 };
    const data = {
      token: 'hello',
      name: 'John',
      description: 'awesome',
      capacity: 400,
      location: 'area 12',
      image: '/images/img.jsx',
      price: 24
    };
    const error = {response: {data: {message: 'error'}}};
    return expectSaga(watchUpdateCenter)

      .provide([[call(axios.put, '/api/v1/centers/42', data), throwError(error)]])
      // Assert that the `put` will eventually happen.
      .put({ type: 'ERROR', error: 'error' })

      .put({ type: 'UNLOAD' })

      .put({ type: '!SUCCESS'})

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'UPDATE_CENTER', payload: data, index: 42 })

      // Start the test. Returns a Promise.
      .run(3000);
  });

  it('tests error handling in addevents', () => {
    const data = {
      token: 'hello',
      name: 'John',
      type: 'awesome',
      time: 400,
      date: 'area 12',
      guests: '/images/img.jsx',
      title: 24
    };
    const error = {response: {data: {message: 'error'}}};
    const action = {
      value: 'John',
      type: 'awesome',
      time: 400,
      date: 'area 12',
      guests: '/images/img.jsx',
      title: 24
    };
    return expectSaga(watchAddEvent)

      .provide([[call(axios.post, '/api/v1/events', data), throwError(error)]])

      .put({ type: 'ERROR', error: 'error' })

      .put({ type: 'UNLOAD' })

      .put({ type: '!SUCCESS'})

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'ADD_EVENT', payload: action })

      // Start the test. Returns a Promise.
      .run(2000);
  });

  it('tests error handling in updates event', () => {
    const data = {
      token: 'hello',
      name: 'John',
      type: 'awesome',
      time: 400,
      date: 'area 12',
      guests: '/images/img.jsx',
      title: 24
    };
    const error = {response: {data: {message: 'error'}}};
    const action = {
      center: 'John',
      type: 'awesome',
      time: 400,
      date: 'area 12',
      guests: '/images/img.jsx',
      title: 24
    };
    return expectSaga(watchUpdateEvent)

      .provide([[call(axios.put, '/api/v1/events/42', data), throwError(error)]])

      .put({ type: 'ERROR', error: 'error' })

      .put({ type: 'UNLOAD' })

      .put({ type: '!SUCCESS'})

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'UPDATE_EVENT', payload: action, index: 42 })

      // Start the test. Returns a Promise.
      .run(2000);
  });

  it('tests error handling in delete event', () => {
    // const action = { index: 42 };
    localStorage.setItem('token', 'hello');
    const response = {
       data: {
        message: 'deleted!'
      }
    };
    const error = {response: {data: {message: 'error'}}};
    return expectSaga(watchDeleteEvent)

      .provide([[call(axios.delete, '/api/v1/events/42?token=hello'),
      throwError(error)]])

      .put({ type: 'ERROR', error: 'error' })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'DELETE_EVENT', index: 42 })

      // Start the test. Returns a Promise.
      .run();
  });
});

