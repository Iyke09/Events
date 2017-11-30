import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import centers from './centers';
import loader from './loader';
import user from './user';
import single from './singleReducer';
import events from './events';
import message from './message';

const rootReducer = combineReducers({ centers,message, events, single, user, loader, routing: routerReducer });


export default rootReducer;
