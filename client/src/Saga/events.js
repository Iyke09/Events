import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import Rwg from 'random-word-generator';
import { browserHistory } from 'react-router';


const eventUrl = '/api/v1/events';

export function* getEvents(action) {
	try {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['token'] = token;
		const response = yield call(axios.get, `${eventUrl}/user`);
		yield put({ type: 'SET_EVENTS', response: response.data });
	} catch (e) {
		const error = e.response.data.message;
		console.log('leggooo '+error);
	}
}

export function* watchGetEvents() {
	yield takeEvery('GET_EVENTS', getEvents);
}

export function* addEvents(action) {
	try {
		const token = localStorage.getItem('token');
    axios.defaults.headers.common['token'] = token;
		const response = yield call(axios.post, eventUrl, {
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
	} catch (e) {
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
	try {
		const token = localStorage.getItem('token');
    axios.defaults.headers.common['token'] = token;
		const response = yield call(axios.put, `${eventUrl}/${action.index}`, {
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
	} catch (e) {
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
	try {
		const token = localStorage.getItem('token');
    axios.defaults.headers.common['token'] = token;
		const response = yield call(axios.delete, `${eventUrl}/${action.index}`);
		console.log(response.data.message);
	} catch (e) {
		const error = e.response.data.message;
		console.log(error);
		yield put({ type: 'ERROR', error });
	}
}

export function* watchDeleteEvent() {
	yield takeEvery('DELETE_EVENT', deleteEvents);
}

export function* getSingleEvents(action) {
	try {
		const token = localStorage.getItem('token');
    axios.defaults.headers.common['token'] = token;
		const response = yield call(axios.get, `${eventUrl}/single/${action.index}`);
		yield put({ type: 'SET_SINGLE_EVENT', response: response.data });
	} catch (e) {
		const error = e.response.data.message;
		console.log(error);
	}
}

export function* watchGetSingleEvent() {
	yield takeEvery('GET_SINGLE_EVENT', getSingleEvents);
}