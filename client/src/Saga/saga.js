import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import {
	watchGetCenters,
	watchGetSingle,
	watchAddCenter,
	watchUpdateCenter,
	watchFavoriteCenter
} from './center';

import {
	watchSignUser,
	watchAddUser,
	watchRetrievePass,
	watchChangePass,
	watchGetReviews,
	watchAddReview,
} from './user';

import {
	watchGetSingleEvent,
	watchGetEvents,
	watchDeleteEvent,
	watchUpdateEvent,
	watchAddEvent,
	watchCenterEvents
} from './events';

export default function* rootSaga() {
	yield [
		watchAddUser(),
		watchGetReviews(),
		watchChangePass(),
		watchAddReview(),
		watchFavoriteCenter(),
		watchRetrievePass(),
		watchDeleteEvent(),
		watchUpdateCenter(),
		watchUpdateEvent(),
		watchAddEvent(),
		watchGetSingleEvent(),
		watchCenterEvents(),
		watchGetEvents(),
		watchSignUser(),
		watchGetCenters(),
		watchGetSingle(),
		watchAddCenter()
	];
}
