import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import {
	watchGetCenters,
	watchGetSingle,
	watchAddCenter,
	watchUpdateCenter,
	watchGetReviews,
	watchAddReview,
	watchFavoriteCenter
} from './center';

import {
	watchSignUser,
	watchAddUser,
	watchRetrievePass,
	watchChangePass,
} from './user';

import {
	watchGetSingleEvent,
	watchGetEvents,
	watchDeleteEvent,
	watchUpdateEvent,
	watchAddEvent
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
	watchGetEvents(),
	watchSignUser(),
	watchGetCenters(),
	watchGetSingle(),
	watchAddCenter()
	];
}
