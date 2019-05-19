import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { IUser, TAuthenticateAction, TLogoutAction } from './types';

const currentUser = createReducer(null as null | IUser)
	.handleAction(
		[ TAuthenticateAction.success, TAuthenticateAction.success, TAuthenticateAction.success ],
		(state, action) => action.payload,
	)
	.handleAction(TLogoutAction.success, (state, action) => null);

const isLoading = createReducer(false as boolean)
	.handleAction(
		[
			TAuthenticateAction.request,
			TAuthenticateAction.request,
			TAuthenticateAction.request,
			TLogoutAction.request,
		],
		() => true,
	)
	.handleAction(
		[
			TAuthenticateAction.success,
			TAuthenticateAction.success,
			TLogoutAction.success,
			TAuthenticateAction.success,
		],
		() => false,
	)
	.handleAction(
		[
			TAuthenticateAction.failure,
			TAuthenticateAction.failure,
			TLogoutAction.failure,
			TAuthenticateAction.failure,
		],
		() => false,
	);

const authError = createReducer('' as string)
	.handleAction(
		[
			TAuthenticateAction.failure,
			TAuthenticateAction.failure,
			TLogoutAction.failure,
			TAuthenticateAction.failure,
		],
		(state, action) => action.payload,
	)
	.handleAction(
		[
			TAuthenticateAction.success,
			TAuthenticateAction.success,
			TLogoutAction.success,
			TAuthenticateAction.success,
		],
		() => '',
	);

const AuthReducer = combineReducers({
	currentUser,
	isLoading,
	authError,
});

export default AuthReducer;

export type UserAuthState = ReturnType<typeof AuthReducer>;
