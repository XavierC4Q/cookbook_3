import * as types from '../../constants/user';

export type UserActionTypes =
	| typeof types.LOGGED_IN_USER
	| typeof types.LOGIN
	| typeof types.LOGIN_ERROR
	| typeof types.LOGIN_SUCCESS
	| typeof types.SIGNUP
	| typeof types.SIGNUP_ERROR
	| typeof types.SIGNUP_SUCCESS
	| typeof types.LOGOUT
	| typeof types.LOGOUT_ERROR
	| typeof types.LOGOUT_SUCCESS;
