import { Reducer } from 'redux';
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
	id: number | undefined;
	pk: number | undefined;
	username: string;
	email?: string;
	country: string;
	date_joined: Date;
	last_login: Date;
}

export interface IUserState {
	currentUser: IUser | null;
	login_loading: boolean;
	login_error: string;
	signup_loading: boolean;
	signup_error: string;
	logout_loading: boolean;
	logout_error: string;
}


const initialState: IUserState = {
	currentUser: null,
	login_loading: false,
	login_error: '',
	signup_loading: false,
	signup_error: '',
	logout_loading: false,
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
				login_loading: true,
				login_error: ''
			};
		case LOGIN_ERROR:
			return {
				...state,
				login_loading: false,
				login_error: action.login_error
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				login_loading: false,
				currentUser: action.user
			};
		case SIGNUP:
			return {
				...state,
				signup_loading: true,
				signup_error: ''
			};
		case SIGNUP_SUCCESS:
			return {
				...state,
				currentUser: action.newUser,
				signup_loading: false
			};
		case SIGNUP_ERROR:
			return {
				...state,
				signup_loading: false,
				signup_error: action.signup_error
			};
		case LOGOUT:
			return {
				...state,
				logout_loading: true,
				logout_error: ''
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				currentUser: null,
				logout_loading: false
			};
		case LOGOUT_ERROR:
			return {
				...state,
				logout_error: action.logout_error,
				logout_loading: false
			};
		default:
			return state;
	}
};
