import { Reducer } from 'redux';
import * as types from '../constants/user';
import { AppActions } from '../config';

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

export const userReducer: Reducer<IUserState, AppActions> = (state = initialState, action) => {
	switch (action.type) {
		case types.LOGGED_IN_USER:
			return {
				...state,
				currentUser: action.payload
			};
		case types.LOGIN:
			return {
				...state,
				login_loading: true,
				login_error: ''
			};
		case types.LOGIN_ERROR:
			return {
				...state,
				login_loading: false,
				login_error: action.payload
			};
		case types.LOGIN_SUCCESS:
			return {
				...state,
				login_loading: false,
				currentUser: action.payload
			};
		case types.SIGNUP:
			return {
				...state,
				signup_loading: true,
				signup_error: ''
			};
		case types.SIGNUP_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				signup_loading: false
			};
		case types.SIGNUP_ERROR:
			return {
				...state,
				signup_loading: false,
				signup_error: action.payload
			};
		case types.LOGOUT:
			return {
				...state,
				logout_loading: true,
				logout_error: ''
			};
		case types.LOGOUT_SUCCESS:
			return {
				...state,
				currentUser: null,
				logout_loading: false
			};
		case types.LOGOUT_ERROR:
			return {
				...state,
				logout_error: action.payload,
				logout_loading: false
			};
		default:
			return state;
	}
};
