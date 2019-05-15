import { combineReducers } from 'redux';
import AuthReducer from './auth/reducers';
import RecipeReducer from './recipe/reducers';
import UserReducer from './users/reducers';

export default combineReducers({
    auth: AuthReducer,
    recipes: RecipeReducer,
    users: UserReducer,
});