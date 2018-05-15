import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import Rwg from 'random-word-generator';
import { browserHistory } from 'react-router';

const userUrl = '/api/v1/users';

export function* addUserAsync(action) {
	try {
		const response = yield call(axios.post, `${userUrl}/signup`, {
			username: action.payload.username,
			email: action.payload.email,
			password: action.payload.password
		});
		yield put({ type: 'ERROR', error: '' });
		yield put({ type: 'SUCCESS' });
		yield put({ type: 'UNLOAD' });
		localStorage.setItem('token', response.data.token);
		//browserHistory.push('/');
	} catch (e) {
		const error = e.response.data.message;
		console.log(error);
		yield put({ type: 'UNLOAD' });
		yield put({ type: 'ERROR', error });
	}
}

export function* watchAddUser() {
	yield takeEvery('SIGN_UP', addUserAsync);
}

export function* addSignAsync(action) {
	try {
		const route = localStorage.getItem('route');
		const response = yield call(axios.post, `${userUrl}/signin`, {
			email: action.payload.email,
			password: action.payload.password
		});
		yield put({ type: 'ERROR', error: '' });
		//yield delay(2000);

        yield put({ type: 'UNLOAD' });
		localStorage.setItem('token', response.data.token);
		if (route === null) {
			browserHistory.push('/');
		} else if (route === 'hello') {
			console.log('hello');
		} else {
			browserHistory.push(route);
			localStorage.removeItem('route');
		}
	} catch (e) {
		const { email, password } = action.payload;
		yield put({ type: 'UNLOAD' });
		if (password === 'annonymous') {
			yield put({
				type: 'SIGN_UP',
				payload: { username: new Rwg().generate(), email, password }
			});
		} else {
			const error = e.response.data.message;
			yield put({ type: 'ERROR', error });
		}
	}
}

export function* watchSignUser() {
	yield takeEvery('SIGN_IN', addSignAsync);
}

export function* retrievePass(action) {
	try {
		const response = yield call(axios.post, `${userUrl}/reset`, {
			email: action.email
		});
		yield put({ type: 'ERROR', error: '' });
		yield put({ type: 'SUCCESS' });
		yield delay(1000);

		yield put({ type: '!SUCCESS' });
	} catch (e) {
		const error = e.response.data.message;
		yield put({ type: 'ERROR', error });
		yield delay(2000);
		yield put({ type: 'ERROR', error: '' });
	}
}

export function* watchRetrievePass() {
	yield takeEvery('RETRIEVE', retrievePass);
}

export function* changePassword(action) {
	try {
		const token = localStorage.getItem('token');
        axios.defaults.headers.common['token'] = token;
		const response = yield call(axios.post, `${userUrl}/change`, {
			old: action.payload.old_pass,
			newp: action.payload.new_pass,
			newc: action.payload.con_pass
		});
		yield put({ type: 'ERROR', error: '' });
		yield put({ type: 'SUCCESS' });
		yield delay(2000);

		yield put({ type: '!SUCCESS' });
	} catch (e) {
		const error = e.response.data.message;
		console.log(error);
		yield put({ type: 'ERROR', error });
		yield delay(3000);
		yield put({ type: 'ERROR', error: '' });
	}
}

export function* watchChangePass() {
	yield takeEvery('CHANGE_PASSWORD', changePassword);
}