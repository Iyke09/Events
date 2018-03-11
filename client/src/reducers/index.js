import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import centers from './Centers';
import events from './Events';
import Notify from './Notifications';

const rootReducer = combineReducers({ centers, Notify, events, routing: routerReducer });


export default rootReducer;
