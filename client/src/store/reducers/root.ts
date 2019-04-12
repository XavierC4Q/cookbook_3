import { combineReducers } from 'redux';
import { profileReducer } from './profile';
import { recipeReducer } from './recipe';
import { userReducer } from './user';

export const rootReducer = combineReducers({
	users: userReducer,
	recipe: recipeReducer,
	profile: profileReducer,
});
