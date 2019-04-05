import axios from 'axios';
import { IUser } from '../../reducers/user';
import { UserActions } from '../types/user';
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
import { AppThunk } from '../../config';

export type LoginCred = {
	username: string;
	password: string;
};

export type SignUpCred = {
	username: string;
	password1: string;
	password2: string;
	country: string;
	email: string;
};

const LOGGED_IN_AC = (loggedInUser: IUser): UserActions => ({ type: LOGGED_IN_USER, loggedInUser });

export const loggedInThunk = (): AppThunk<Promise<boolean>> => async dispatch => {
	try {
        const loggedInUser = await axios.get('/rest_auth/user/');
        localStorage.setItem('user', JSON.stringify(loggedInUser.data, null, 2));
		dispatch(LOGGED_IN_AC(loggedInUser.data));
		return true;
	} catch (error) {
        localStorage.removeItem('user');
		return false;
	}
};

const LOGIN_AC = (): UserActions => ({ type: LOGIN });

const LOGIN_ERROR_AC = (login_error: string): UserActions => ({ type: LOGIN_ERROR, login_error });

const LOGIN_SUCCESS_AC = (user: IUser): UserActions => ({ type: LOGIN_SUCCESS, user });

export const loginThunk = (credentials: LoginCred): AppThunk<void> => dispatch => {
	dispatch(LOGIN_AC());
	setTimeout(async () => {
		try {
			await axios.post('/rest_auth/login/', credentials);
            const user = await axios.get('/rest_auth/user/');
            localStorage.setItem('user', JSON.stringify(user.data, null, 2));
			dispatch(LOGIN_SUCCESS_AC(user.data));
		} catch (error) {
			console.log('login errrrr', error)
			dispatch(LOGIN_ERROR_AC('Wrong username/password combination'));
		}
	}, 2000);
};


const SIGNUP_AC = (): UserActions => ({ type: SIGNUP });

const SIGNUP_ERROR_AC = (signup_error: string): UserActions => ({ type: SIGNUP_ERROR, signup_error });

const SIGNUP_SUCCESS_AC = (newUser: IUser): UserActions => ({ type: SIGNUP_SUCCESS, newUser });

export const signupThunk  = (credentials: SignUpCred): AppThunk<void> => dispatch => {
    dispatch(SIGNUP_AC());
    setTimeout(async () => {
        try {
            await axios.post('/rest_auth/signup/', credentials);
            const user = await axios.get('/rest_auth/user/');
            localStorage.setItem('user', JSON.stringify(user.data, null, 2));
            dispatch(SIGNUP_SUCCESS_AC(user.data));
        } catch (error) {
            dispatch(SIGNUP_ERROR_AC('Provided credentials are invalid'));
        }
    }, 2000);
};


const LOGOUT_AC = (): UserActions => ({ type: LOGOUT });

const LOGOUT_ERROR_AC = (logout_error: string): UserActions => ({ type: LOGOUT_ERROR, logout_error });

const LOGOUT_SUCCESS_AC = (): UserActions => ({ type: LOGOUT_SUCCESS });

export const logoutThunk = (): AppThunk<void> => async dispatch => {
	dispatch(LOGOUT_AC());
	try {
		await axios.post('/rest_auth/logout/');
		localStorage.removeItem('user');
		dispatch(LOGOUT_SUCCESS_AC());
	} catch (error) {
		dispatch(LOGOUT_ERROR_AC('Error logging out'));
	}
};