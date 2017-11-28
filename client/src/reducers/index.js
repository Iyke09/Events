import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import centers from './centers';
import loader from './loader';
import error from './error';
import user from './user';
import success from './success';
import single from './single';
import events from './events';


const rootReducer = combineReducers({ centers, events, single,success, user, error, loader, routing: routerReducer });


export default rootReducer;
