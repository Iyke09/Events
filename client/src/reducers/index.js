import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import centers from './centers';
import loader from './loader';
import user from './user';
import single from './singleCenter';
import events from './events';
import success from './success';
import error from './error';
import singleEvent from './singleEvent';

const rootReducer = combineReducers({ centers, singleEvent,error,success,
  events, single, user, loader, routing: routerReducer });


export default rootReducer;
