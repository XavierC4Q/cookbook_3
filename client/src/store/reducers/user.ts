import { Reducer } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { UserActions } from '../actions/types/user';
import {
	LOGIN,
	LOGGED_IN_USER,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	SIGNUP,
	SIGNUP_SUCCESS,
	SIGNUP_ERROR,
	LOGOUT,
	LOGOUT_ERROR,
	LOGOUT_SUCCESS
} from '../constants/user';

export interface IUser {
	id: Number;
	username: String;
	email?: String;
	country: String;
	date_joined: Date;
	last_login: Date;
}

export interface IUserState {
	currentUser: IUser | null;
	login_pending: Boolean;
	login_error: String;
	signup_pending: Boolean;
	signup_error: String;
	logout_pending: Boolean;
	logout_error: String;
}

export type UserThunk<R> = ThunkAction<R, IUserState, undefined, UserActions>;


const initialState: IUserState = {
	currentUser: null,
	login_pending: false,
	login_error: '',
	signup_pending: false,
	signup_error: '',
	logout_pending: false,
	logout_error: ''
};

export const userReducer: Reducer<IUserState, UserActions> = (state = initialState, action) => {
	switch (action.type) {
		case LOGGED_IN_USER:
			return {
				...state,
				currentUser: action.loggedInUser
			};
		case LOGIN:
			return {
				...state,
				login_pending: true,
				login_error: ''
			};
		case LOGIN_ERROR:
			return {
				...state,
				login_pending: false,
				login_error: action.login_error
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				login_pending: false,
				currentUser: action.user
			};
		case SIGNUP:
			return {
				...state,
				signup_pending: true,
				signup_error: ''
			};
		case SIGNUP_SUCCESS:
			return {
				...state,
				currentUser: action.newUser,
				signup_pending: false
			};
		case SIGNUP_ERROR:
			return {
				...state,
				signup_pending: false,
				signup_error: action.signup_error
			};
		case LOGOUT:
			return {
				...state,
				logout_pending: true,
				logout_error: ''
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				currentUser: null,
				logout_pending: false
			};
		case LOGOUT_ERROR:
			return {
				...state,
				logout_error: action.logout_error,
				logout_pending: false
			};
		default:
			return state;
	}
};
