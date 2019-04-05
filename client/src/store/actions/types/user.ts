import {
	LOGGED_IN_USER,
	LOGIN,
	LOGIN_ERROR,
	LOGIN_SUCCESS,
	SIGNUP,
	SIGNUP_ERROR,
	SIGNUP_SUCCESS,
	LOGOUT,
	LOGOUT_ERROR,
	LOGOUT_SUCCESS
} from '../../constants/user';

export type UserActions =
	| typeof LOGGED_IN_USER
	| typeof LOGIN
	| typeof LOGIN_ERROR
	| typeof LOGIN_SUCCESS
	| typeof SIGNUP
	| typeof SIGNUP_ERROR
	| typeof SIGNUP_SUCCESS
	| typeof LOGOUT 
	| typeof LOGOUT_ERROR
	| typeof LOGOUT_SUCCESS;

