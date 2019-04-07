import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { rootReducer } from './reducers/root';
import { ThunkAction } from 'redux-thunk';
import { AllTypes } from './actions/types';

interface IAppActions {
	type: AllTypes;
	readonly payload?: any
}

export type AppActions = IAppActions;

export type AppState = ReturnType<typeof rootReducer>;

export type AppThunk<R> = ThunkAction<R, AppState, undefined, AppActions>;


export default () => {
	const middleware = [ logger ];
	const store = createStore(
		rootReducer,
		undefined,
		composeWithDevTools(
            applyMiddleware(
                ...middleware, 
                thunk as ThunkMiddleware<AppState, AppActions>
                )
            )
	);

	return store;
};
