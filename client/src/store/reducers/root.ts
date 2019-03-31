import { userReducer } from './user';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    users: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;