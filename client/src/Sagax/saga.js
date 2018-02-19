import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import Rwg from 'random-word-generator';
import { browserHistory } from 'react-router';


const userUrl = '/api/v1/users';
const centerUrl = '/api/v1/centers';
const eventUrl = '/api/v1/events';
const token = localStorage.getItem('token');

// axios.defaults.headers.common['token'] = token;

export function* addUserAsync(action) {
  try{
      const response = yield call(axios.post, `${userUrl}/signup`, {
          username: action.payload.username,
          email: action.payload.email,
          password: action.payload.password
      });
      console.log(response);
      yield put({ type: 'ERROR', error: '' });
      yield put({ type: 'SUCCESS' });
      yield put({ type: 'UNLOAD' });
      //yield delay(2000);

      yield put({ type: '!SUCCESS' });
      yield put({ type: 'INCOMING_TOKEN', response: response.data });
      //browserHistory.push('/');
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
      const route = localStorage.getItem('route');
      const response = yield call(axios.post, `${userUrl}/signin`, {
          email: action.payload.email,
          password: action.payload.password
      });
      yield put({ type: 'ERROR', error: '' });
      //yield delay(2000);

      yield put({ type: 'UNLOAD' });
      yield put({ type: 'INCOMING_TOKEN', response: response.data });
      if(route === null){
        browserHistory.push('/');
      }else if(route === 'hello'){
        console.log('hello');
      }
      else{
        browserHistory.push(route);
        localStorage.removeItem('route');
      }
  }catch(e){
      const { email, password} = action.payload;
      yield put({ type: 'UNLOAD' });
      if(password === 'annonymous'){
        yield put({ type: 'SIGN_UP',
        payload: {username: new Rwg().generate(), email, password } });
      }else{
        const error = e.response.data.message;
        console.log(error);
        yield put({ type: 'ERROR', error });
      }
  }
}


export function* watchSignUser() {
    yield takeEvery('SIGN_IN', addSignAsync);
}

export function* retrievePass(action) {
  try{
      console.log('young jeezy');
      const response = yield call(axios.post, `${userUrl}/reset`, {
          email: action.email,
      });
      console.log(response);
      yield put({ type: 'ERROR', error: '' });
      yield put({ type: 'SUCCESS' });
      yield delay(1000);

      yield put({ type: '!SUCCESS' });
  }catch(e){
      const error = e.response.data.message;
      console.log(error);
      yield put({ type: 'ERROR', error });
      yield delay(2000);
      yield put({ type: 'ERROR', error: '' });
  }
}

export function* watchRetrievePass() {
    yield takeEvery('RETRIEVE', retrievePass);
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


export function* watchGetSingle() {
    yield takeEvery('GET_SINGLE', getSingle);
}

export function* addCenter(action) {
  try{
      const token = localStorage.getItem('token');
      const response = yield call(axios.post, centerUrl, {
        token,
        name: action.payload.name,
        description: action.payload.description,
        capacity: action.payload.capacity,
        location: action.payload.location,
        image: action.payload.image,
        price: action.payload.price
      });
      yield put({ type: 'SET_CENTER', response: response.data });
      yield put({ type: 'ERROR', error: '' });
      yield delay(1000);

      yield put({ type: 'UNLOAD' });
      yield put({ type: 'SUCCESS'});
      yield put({ type: '!SUCCESS'});

  }catch(e){
      yield put({ type: '!SUCCESS' });
      yield put({ type: 'UNLOAD' });
      const error = e.response.data.message;
      console.log(error);
      yield put({ type: 'ERROR', error });
      //yield put({ type: 'ERROR', error: '' });
  }
}


export function* watchAddCenter() {
    yield takeEvery('ADD_CENTER', addCenter);
}

export function* updateCenter(action) {
  try{
      const token = localStorage.getItem('token');
      console.log(token, action.index);
      const response = yield call(axios.put, `${centerUrl}/${action.index}`, {
        token,
        name: action.payload.name,
        description: action.payload.description,
        capacity: action.payload.capacity,
        location: action.payload.location,
        image: action.payload.image,
        price: action.payload.price
      });
      yield put({ type: 'ERROR', error: '' });
      yield delay(3000);
      yield put({ type: 'UNLOAD' });
      yield put({ type: 'SET_SINGLE', response: response.data });
      yield put({ type: 'SUCCESS' });
      yield put({ type: '!SUCCESS' });

  }catch(e){
      yield put({ type: '!SUCCESS'});
      yield put({ type: 'UNLOAD' });
      const error = e.response.data.message;
      console.log(error);
      yield delay(1000);
      yield put({ type: 'ERROR', error });
  }
}

export function* watchUpdateCenter() {
    yield takeEvery('UPDATE_CENTER', updateCenter);
}


export function* getEvents(action) {
  try{
      const token = localStorage.getItem('token');
      const response = yield call(axios.get, `${eventUrl}/user?token=${token}`);
      yield put({ type: 'SET_EVENTS',  response: response.data});

  }catch(e){
      const error = e.response.data.message;
      console.log(error);
  }
}

export function* watchGetEvents() {
    yield takeEvery('GET_EVENTS', getEvents);
}


export function* addEvents(action) {
  try{
      const token = localStorage.getItem('token');
      const response = yield call(axios.post, eventUrl, {
        token,
        name: action.payload.value,
        type: action.payload.type,
        time: action.payload.time,
        date: action.payload.date,
        guests: action.payload.guests,
        title: action.payload.title
      });
      //yield delay(2000);
      yield put({ type: 'ERROR', error: '' });
      yield put({ type: 'UNLOAD' });
      yield put({ type: 'SUCCESS' });
      yield put({ type: '!SUCCESS' });

  }catch(e){
      const error = e.response.data.message;
      console.log(error);
      yield delay(1000);
      yield put({ type: 'UNLOAD' });
      yield put({ type: '!SUCCESS' });
      yield put({ type: 'ERROR', error });
      //yield put({ type: 'ERROR', error: '' });
  }
}

export function* watchAddEvent() {
    yield takeEvery('ADD_EVENT', addEvents);
}

export function* updateEvent(action) {
  try{
    const token = localStorage.getItem('token');
      const response = yield call(axios.put, `${eventUrl}/${action.index}`, {
        token,
        name: action.payload.center,
        type: action.payload.type,
        time: action.payload.time,
        date: action.payload.date,
        guests: action.payload.guests,
        title: action.payload.title
      });
      //yield delay(2000);
      yield put({ type: 'ERROR', error: '' });
      yield put({ type: 'UNLOAD' });
      yield put({ type: 'SUCCESS' });
      yield put({ type: '!SUCCESS' });

  }catch(e){
      const error = e.response.data.message;
      console.log(error);
      yield delay(1000);
      yield put({ type: 'UNLOAD' });
      yield put({ type: '!SUCCESS' });
      yield put({ type: 'ERROR', error });
      // yield put({ type: 'ERROR', error: '' });
  }
}

export function* watchUpdateEvent() {
    yield takeEvery('UPDATE_EVENT', updateEvent);
}


export function* deleteEvents(action) {
  try{
      const token = localStorage.getItem('token');
      const response = yield call(axios.delete, `${eventUrl}/${action.index}?token=${token}`);
      console.log(response.data.message);

  }catch(e){
      const error = e.response.data.message;
      console.log(error);
      yield put({ type: 'ERROR', error });
  }
}

export function* watchDeleteEvent() {
  yield takeEvery('DELETE_EVENT', deleteEvents);
}

export function* getSingleEvents(action) {
  try{
      const token = localStorage.getItem('token');
      const response = yield call(axios.get, `${eventUrl}/single/${action.index}`);
      yield put({ type: 'SET_SINGLE_EVENT', response: response.data });

  }catch(e){
      const error = e.response.data.message;
      console.log(error);
  }
}

export function* watchGetSingleEvent() {
  yield takeEvery('GET_SINGLE_EVENT', getSingleEvents);
}

export default function* rootSaga() {
  yield [
    watchAddUser(),
    watchRetrievePass(),
    watchDeleteEvent(),
    watchUpdateCenter(),
    watchUpdateEvent(),
    watchAddEvent(),
    watchGetSingleEvent(),
    watchGetEvents(),
    watchSignUser(),
    watchGetCenters(),
    watchGetSingle(),
    watchAddCenter()

  ];
}
