// Core
import { createStore, applyMiddleware, compose } from 'redux';

// Middlewares
import { isDev, middlewares } from './middleware';

// Instruments
import rootReducer from './rootReducer';

// ReduxDevTool Extesion
/* eslint no-underscore-dangle: 0 */
const devtools:any = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = isDev && devtools ? devtools : compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

export var totalVotes = 0;
export var producers = {};
