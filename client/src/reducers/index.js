import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import centers from './centers';
import events from './events';
import reviews from './reviews';
import Notify from './notifications';

const rootReducer = combineReducers({ centers,reviews, Notify, events, routing: routerReducer });


export default rootReducer;
