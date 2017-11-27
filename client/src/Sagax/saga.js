import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import { browserHistory } from 'react-router';


const userUrl = 'http://localhost:3000/api/v1/users';
const centerUrl = 'http://localhost:3000/api/v1/centers';

export function* addUserAsync(action) {
  try{
      const response = yield call(axios.post, `${userUrl}/signup`, {
          username: action.payload.username,
          email: action.payload.email,
          password: action.payload.password
      });
      yield put({ type: 'ERROR', error: '' });
      yield put({ type: 'LOAD' });
      setTimeout(() => {
        browserHistory.push('/auth/signin');
      }, 2000);
  }catch(e){
      const error = e.response.data.message;
      console.log(error);
      yield put({ type: 'UNLOAD' });
      yield put({ type: 'ERROR', error });
  }
}

export function* watchAddUser() {
  console.log('watching adduser');
    yield takeEvery('SIGN_UP', addUserAsync);
}

export function* addSignAsync(action) {
  try{
      yield put({ type: 'LOAD' });
      const response = yield call(axios.post, `${userUrl}/signin`, {
          email: action.payload.email,
          password: action.payload.password
      });
      yield put({ type: 'ERROR', error: '' });
      yield put({ type: 'LOAD' });
      yield put({ type: 'INCOMING_TOKEN', response: response.data });
      setTimeout(()=> {
        browserHistory.push('/home');
      }, 2000);
  }catch(e){
      yield put({ type: 'UNLOAD' });
      const error = e.response.data.message;
      console.log(error);
      yield put({ type: 'ERROR', error });
  }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchSignUser() {
  console.log('watching adduser');
    yield takeEvery('SIGN_IN', addSignAsync);
}



export function* getCenters(action) {
  try{
      const response = yield call(axios.get, `${centerUrl}?limit=${action.index}`);
      yield put({ type: 'GET_CENTER', response: response.data });
  }catch(e){
      const error = e.response.data.message;
      console.log(error);
  }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchGetCenters() {
    yield takeEvery('GET_ALL', getCenters);
}


export function* getSingle(action) {
  try{
      const response = yield call(axios.get, `${centerUrl}/${action.index}`);
      yield put({ type: 'SET_SINGLE', response: response.data });
  }catch(e){
      const error = e.response.data.message;
      console.log(error);
  }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchGetSingle() {
    yield takeEvery('GET_SINGLE', getSingle);
}

export function* addCenter(action) {
  try{
      const token = localStorage.getItem('token');
      const response = yield call(axios.post, `${centerUrl}?token=${token}`, {
        name: action.payload.name,
        description: action.payload.description,
        capacity: action.payload.capacity,
        location: action.payload.location,
        image: action.payload.image,
        price: action.payload.price
      });
      yield put({ type: 'SET_CENTER', response: response.data });
      yield put({ type: 'ERROR', error: '' });
      yield delay(3000);
      yield put({ type: 'UNLOAD' });
      yield put({ type: 'SUCCESS', message: 'Successfully added to centers' });

  }catch(e){
      yield put({ type: 'UNLOAD' });
      const error = e.response.data.message;
      console.log(error);
      yield put({ type: 'ERROR', error });
  }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchAddCenter() {
    yield takeEvery('ADD_CENTER', addCenter);
}


export function* updateCenter(action) {
  try{
      const token = localStorage.getItem('token');
      const response = yield call(axios.put, `${centerUrl}/${action.index}?token=${token}`, {
        name: action.payload.name,
        description: action.payload.description,
        capacity: action.payload.capacity,
        location: action.payload.location,
        image: action.payload.image,
        price: action.payload.price
      });
      yield put({ type: 'ERROR', error: '' });
      yield delay(5000);
      yield put({ type: 'UNLOAD' });
      yield put({ type: 'SUCCESS', message: 'Centers successfully updated' });

  }catch(e){
      yield put({ type: 'UNLOAD' });
      const error = e.response.data.message;
      console.log(error);
      yield delay(1000);
      yield put({ type: 'ERROR', error });
  }
}
// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchUpdateCenter() {
    yield takeEvery('UPDATE_CENTER', updateCenter);
}



export default function* rootSaga() {
  yield [
    watchAddUser(),
    watchSignUser(),
    watchGetCenters(),
    watchGetSingle(),
    watchAddCenter(),
    watchUpdateCenter()

  ];
}
