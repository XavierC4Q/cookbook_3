import { Reducer } from 'redux';
import { UserActions } from '../actions/types/user';

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
		case 'user/LOGGED IN USER':
			return {
				...state,
				currentUser: action.loggedInUser
			};
		case 'user/LOGIN':
			return {
				...state,
				login_pending: true,
				login_error: ''
			};
		case 'user/LOGIN ERROR':
			return {
				...state,
				login_pending: false,
				login_error: action.login_error
			};
		case 'user/LOGIN SUCCESS':
			return {
				...state,
				login_pending: false,
				currentUser: action.user
			};
		case 'user/SIGNUP':
			return {
				...state,
				signup_pending: true,
				signup_error: ''
			};
		case 'user/SIGNUP SUCCESS':
			return {
				...state,
				currentUser: action.newUser,
				signup_pending: false
			};
		case 'user/SIGNUP ERROR':
			return {
				...state,
				signup_pending: false,
				signup_error: action.signup_error
			};
		case 'user/LOGOUT':
			return {
				...state,
				logout_pending: true,
				logout_error: ''
			};
		case 'user/LOGOUT SUCCESS':
			return {
				...state,
				currentUser: null,
				logout_pending: false
			};
		case 'user/LOGOUT ERROR':
			return {
				...state,
				logout_error: action.logout_error,
				logout_pending: false
			};
		default:
			return state;
	}
};
