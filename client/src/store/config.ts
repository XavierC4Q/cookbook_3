import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { UserActions } from './actions/types/user';
import { RecipeActions } from './actions/types/recipe';
import { rootReducer } from './reducers/root';
import { ThunkAction } from 'redux-thunk';
import { ProfileActions } from './actions/types/profile';

export type AppActions = UserActions | RecipeActions | ProfileActions;

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
