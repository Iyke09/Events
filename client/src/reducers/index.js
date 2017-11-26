import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import centers from './centers';
import loader from './loader';
import error from './error';
import user from './user';

import single from './single';


const rootReducer = combineReducers({ centers,single, user, error, loader, routing: routerReducer });


export default rootReducer;
