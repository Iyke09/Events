import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import Rwg from 'random-word-generator';
import { browserHistory } from 'react-router';

const centerUrl = '/api/v1/centers';

export function* getCenters(action) {
	try {
        let response = {};
        if(typeof(action.index) !== 'number'){
			console.log('watamaguwa');
            response = yield call(axios.get, `${centerUrl}?name=${action.index}`);
        }else{
            response = yield call(axios.get, `${centerUrl}?limit=${action.index}`);
		}
		yield put({ type: 'GET_CENTER', response: response.data });
	} catch (e) {
		const error = e.response.data.message;
        console.log(error);
        yield put({ type: 'ERROR', error });
	}
}

export function* watchGetCenters() {
	yield takeEvery('GET_ALL', getCenters);
}

export function* getSingle(action) {
	try {
		const response = yield call(axios.get, `${centerUrl}/${action.index}`);
		yield put({ type: 'SET_SINGLE', response: response.data });
	} catch (e) {
		const error = e.response.data.message;
		console.log(error);
	}
}

export function* watchGetSingle() {
	yield takeEvery('GET_SINGLE', getSingle);
}

export function* addCenter(action) {
	try {
		const token = localStorage.getItem('token');
        axios.defaults.headers.common['token'] = token;
		const response = yield call(axios.post, centerUrl, {
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
		yield put({ type: 'SUCCESS' });
		yield put({ type: '!SUCCESS' });
	} catch (e) {
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
	try {
		const token = localStorage.getItem('token');
        axios.defaults.headers.common['token'] = token;
		const response = yield call(axios.put, `${centerUrl}/${action.index}`, {
			name: action.payload.name,
			description: action.payload.description,
			capacity: action.payload.capacity,
			location: action.payload.location,
			image: action.payload.image,
			price: action.payload.price
		});
		yield put({ type: 'ERROR', error: '' });
		yield delay(1000);
		yield put({ type: 'UNLOAD' });
		yield put({ type: 'SET_SINGLE', response: response.data });
		yield put({ type: 'SUCCESS' });
		yield put({ type: '!SUCCESS' });
	} catch (e) {
		yield put({ type: '!SUCCESS' });
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



export function* favoriteCenter(action) {
	try {
		const token = localStorage.getItem('token');
         axios.defaults.headers.common['token'] = token;
		const response = yield call(axios.put, `${centerUrl}/favorite/${action.index}`, {
            match: 'xtra'
        });
        // console.log(response.data.message);
		yield put({ type: 'GET_ALL', index: 6 });

	} catch (e) {
		//const error = e.response.data.message;
		console.log(e);
	}
}

export function* watchFavoriteCenter() {
	yield takeEvery('FAVORITE_CENTER', favoriteCenter);
}
