import thunk, { ThunkMiddleware } from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootAction, RootState } from 'typesafe-actions';
import { logger as loggerMiddleWare }from 'redux-logger';
import RootReducer from './rootReducer';

const middleware = [loggerMiddleWare];

const enhancers = composeWithDevTools(
    applyMiddleware(
        ...middleware, 
        thunk as ThunkMiddleware<RootState, RootAction>
        )
);

const store = createStore(
    RootReducer,
    undefined,
    enhancers
);

export default store;