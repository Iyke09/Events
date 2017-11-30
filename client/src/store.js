import { createStore , applyMiddleware } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootSaga from './Sagax/saga';

// import the root reducer
import rootReducer from './reducers/index';
// create an object for the default data

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export const history = syncHistoryWithStore(browserHistory, store);

sagaMiddleware.run(rootSaga);


export default store;
