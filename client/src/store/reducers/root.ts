import { userReducer } from './user';
import { recipeReducer } from './recipe';
import { profileReducer } from './profile';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    users: userReducer,
    recipe: recipeReducer,
    profile: profileReducer
});