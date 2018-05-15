// import centerReducer from '../../src/reducers/Centers';
// import loaderReducer from '../../src/reducers/Notifications';
// import eventReducer from '../../src/reducers/Events';
import MockAdapter from 'axios-mock-adapter';
import { call, put, take } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from "redux-saga-test-plan/providers";
import axios from 'axios';
import {
	watchGetCenters,
	watchGetSingle,
	watchAddCenter,
	watchUpdateCenter,
	watchGetReviews,
	watchAddReview,
	watchFavoriteCenter
} from '../../src/Saga/center';

import {
	watchSignUser,
	watchAddUser,
	watchRetrievePass,
	watchChangePass,
} from '../../src/Saga/user';

import {
	watchGetSingleEvent,
	watchGetEvents,
	watchDeleteEvent,
	watchUpdateEvent,
	watchAddEvent
} from '../../src/Saga/events';



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

      .provide([[call(axios.get, '/api/v1/centers?limit=42'), response]])
      // Assert that the `put` will eventually happen.
      .put({ type: 'GET_CENTER', response: {center: { id: 1, name: 'John Smith' }} })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'GET_ALL', index: 42 })

      // Start the test. Returns a Promise.
      .run();
  });

  it('gets all available reviews', () => {
    // const action = { index: 42 };
    const response = { data: 'hello'};

    return expectSaga(watchGetReviews)

      .provide([[call(axios.get, '/api/v1/centers/reviews/42'), response]])
      // Assert that the `put` will eventually happen.
      .put({ type: 'GET_REVIEWS', response: 'hello' })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'GET_ALL_REVIEWS', index: 42 })

      // Start the test. Returns a Promise.
      .run();
  });

  it('add reviews to the review state', () => {
    // const action = { index: 42 };
    const response = { data: 'hello'};

    const action = {
      id: 1,
      username: 'doe',
      comment: 'hello'
    };

    return expectSaga(watchAddReview)

      .provide([[call(axios.post, '/api/v1/centers/reviews', action), response]])
      // Assert that the `put` will eventually happen.
      .put({ type: 'SET_REVIEW', response: 'hello' })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'ADD_REVIEW', payload: action })

      // Start the test. Returns a Promise.
      .run();
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
      name: 'John',
      description: 'awesome',
      capacity: 400,
      location: 'area 12',
      image: '/images/img.jsx',
      price: 24
    };
    return expectSaga(watchAddCenter)

      .provide([[call(axios.post, '/api/v1/centers', action), response]])
      // Assert that the `put` will eventually happen.
      .put({ type: 'SET_CENTER', response: {center: { id: 1, name: 'John Smith' }} })

      .put({ type: 'ERROR', error: '' })

      .put({ type: 'UNLOAD' })

      .put({ type: 'SUCCESS'})

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'ADD_CENTER', payload: action })

      // Start the test. Returns a Promise.
      .run(1200);
  });

  it('favorites a center', () => {
    // const action = { index: 42 };
    localStorage.setItem('token', 'hello');
    const response = '';
    const data = {
      match: 'xtra'
    };
    return expectSaga(watchFavoriteCenter)

      .provide([[call(axios.put, '/api/v1/centers/favorite/11', data), response]])
      // Assert that the `put` will eventually happen.
      //.put({ type: 'GET_ALL', index: 6 })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'FAVORITE_CENTER', index: 11 })

      // Start the test. Returns a Promise.
      .run();
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
      .run(2000);
  });

  it('changes user password', () => {
    // const action = { index: 42 };
    const response = {
      data: {token: 'token'}
    };
    const payload = {
      old_pass: 'John',
      new_pass: 'awesome',
      con_pass: 'hello',
    };
    localStorage.setItem('token', 'hello');
    return expectSaga(watchChangePass)

      .provide([[call(axios.post, '/api/v1/users/change', {
        old: 'John',
        newp: 'awesome',
        newc: 'hello',
      }), response]])

      .put({ type: 'ERROR', error: '' })

      .put({ type: 'SUCCESS'})

      .put({ type: '!SUCCESS'})

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'CHANGE_PASSWORD', payload})

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

      .provide([[call(axios.post, '/api/v1/users/signup', action), response]])
      // Assert that the `put` will eventually happen.

      .put({ type: 'ERROR', error: '' })

      .put({ type: 'UNLOAD' })

      .put({ type: 'SUCCESS'})


      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'SIGN_UP', payload: action })

      // Start the test. Returns a Promise.
      .run();
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

      .provide([[call(axios.post, '/api/v1/users/signin', action), response]])
      // Assert that the `put` will eventually happen.

      .put({ type: 'ERROR', error: '' })

      .put({ type: 'UNLOAD' })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'SIGN_IN', payload: action })

      // Start the test. Returns a Promise.
      .run();
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
      name: 'John',
      description: 'awesome',
      capacity: 400,
      location: 'area 12',
      image: '/images/img.jsx',
      price: 24
    };
    return expectSaga(watchUpdateCenter)

      .provide([[call(axios.put, '/api/v1/centers/42', data), response]])
      // Assert that the `put` will eventually happen.
      .put({ type: 'SET_SINGLE', response: {center: { id: 1, name: 'John Smith' }} })

      .put({ type: 'ERROR', error: '' })

      .put({ type: 'UNLOAD' })

      .put({ type: 'SUCCESS'})

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'UPDATE_CENTER', payload: data, index: 42 })

      // Start the test. Returns a Promise.
      .run(1200);
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

      .provide([[call(axios.get, '/api/v1/events/user'), response]])
      // Assert that the `put` will eventually happen.
      .put({ type: 'SET_EVENTS', response: {event: [{ id: 1, name: 'John Smith' }]} })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'GET_EVENTS' })

      // Start the test. Returns a Promise.
      .run();
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
    return expectSaga(watchAddEvent)

      .provide([[call(axios.post, '/api/v1/events', data), response]])

      .put({ type: 'ERROR', error: '' })

      .put({ type: 'UNLOAD' })

      .put({ type: 'SUCCESS'})

      .put({ type: '!SUCCESS'})

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'ADD_EVENT', payload: action })

      // Start the test. Returns a Promise.
      .run(1200);
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
      .run(2000);
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

      .provide([[call(axios.delete, '/api/v1/events/42'), response]])

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'DELETE_EVENT', index: 42 })

      // Start the test. Returns a Promise.
      .run();
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
      .run();
  });
});




///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////

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

  it('test for error handling in RETRIEVING password', () => {
    const error = {response: {data: {message: 'error'}}};

    const payload = {
      old_pass: 'John',
      new_pass: 'awesome',
      con_pass: 'hello',
    };
    localStorage.setItem('token', 'hello');
    return expectSaga(watchChangePass)

      .provide([[call(axios.post, '/api/v1/users/change', {
        old: 'John',
        newp: 'awesome',
        newc: 'hello',
      }),
       throwError(error)]])

      .put({ type: 'ERROR', error: 'error' })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'CHANGE_PASSWORD', payload })

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
      name: 'John',
      description: 'awesome',
      capacity: 400,
      location: 'area 12',
      image: '/images/img.jsx',
      price: 24
    };
    const error = {response: {data: {message: 'error'}}};
    return expectSaga(watchAddCenter)

      .provide([[call(axios.post, '/api/v1/centers', action), throwError(error)]])
      // Assert that the `put` will eventually happen.
      .put({ type: 'ERROR', error: 'error' })

      .put({ type: 'UNLOAD' })

      .put({ type: '!SUCCESS'})

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'ADD_CENTER', payload: action })

      // Start the test. Returns a Promise.
      .run();
  });

  it('tests error handling in update center', () => {
    const actione = { index: 42 };
    const data = {
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

      .provide([[call(axios.delete, '/api/v1/events/42'),
      throwError(error)]])

      .put({ type: 'ERROR', error: 'error' })

      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'DELETE_EVENT', index: 42 })

      // Start the test. Returns a Promise.
      .run();
  });
});

