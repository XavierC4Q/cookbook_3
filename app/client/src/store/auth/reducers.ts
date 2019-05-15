import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import {
	IUser,
	LoginActionType as Login,
	LogoutActionType as Logout,
	LoggedInUserActionType as LoggedIn,
	SignUpActionType as Signup,
} from './types';

const currentUser = createReducer(null as null | IUser)
	.handleAction([ Login.success, LoggedIn.success, Signup.success ], (state, action) => action.payload)
	.handleAction(Logout.success, (state, action) => null);

const isLoading = createReducer(false as boolean)
	.handleAction([ LoggedIn.request, Login.request, Signup.request, Logout.request ], () => true)
	.handleAction([ LoggedIn.success, Login.success, Logout.success, Signup.success ], () => false)
	.handleAction([ LoggedIn.failure, Login.failure, Logout.failure, Signup.failure ], () => false);

const authError = createReducer('' as string)
    .handleAction([ LoggedIn.failure, Login.failure, Logout.failure, Signup.failure ], (state, action) => action.payload)
    .handleAction([ LoggedIn.success, Login.success, Logout.success, Signup.success], () => '');

const AuthReducer = combineReducers({
    currentUser,
    isLoading,
    authError,
});

export default AuthReducer;

export type UserAuthState = ReturnType<typeof AuthReducer>;