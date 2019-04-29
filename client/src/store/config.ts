import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { ThunkAction } from 'redux-thunk';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { AllTypes } from './actions/types';
import { rootReducer } from './reducers/root';

interface IAppActions {
	type: AllTypes;
	readonly payload?: any;
	readonly meta?: { [key: string]: any };
}

export type AppActions = IAppActions;

export type AppState = ReturnType<typeof rootReducer>;

export type AppThunk<R> = ThunkAction<R, AppState, undefined, AppActions>;

export default () => {
	const middleware = [ logger ];
	const store = createStore(
		rootReducer,
		undefined,
		composeWithDevTools(applyMiddleware(...middleware, thunk as ThunkMiddleware<AppState, AppActions>)),
	);

	return store;
};
