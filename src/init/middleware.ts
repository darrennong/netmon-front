import thunk from 'redux-thunk';

// Router
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

export const isDev = process.env.NODE_ENV === 'development';
export const history = createBrowserHistory();

export const middlewares = [thunk, createRouterMiddleware(history)];