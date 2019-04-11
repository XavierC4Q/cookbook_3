import axios from 'axios';
import { IUser } from '../../reducers/user';
import * as types from '../../constants/user';
import { AppThunk, AppActions } from '../../config';

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

const LOGGED_IN_AC = (payload: IUser): AppActions => ({ type: types.LOGGED_IN_USER, payload });

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

const LOGIN_AC = (): AppActions => ({ type: types.LOGIN });

const LOGIN_ERROR_AC = (payload: string): AppActions => ({ type: types.LOGIN_ERROR, payload });

const LOGIN_SUCCESS_AC = (payload: IUser): AppActions => ({ type: types.LOGIN_SUCCESS, payload });

export const loginThunk = (credentials: LoginCred): AppThunk<void> => dispatch => {
	dispatch(LOGIN_AC());
	setTimeout(async () => {
		try {
			await axios.post('/rest_auth/login/', credentials);
            const user = await axios.get('/rest_auth/user/');
            localStorage.setItem('user', JSON.stringify(user.data, null, 2));
			dispatch(LOGIN_SUCCESS_AC(user.data));
		} catch (error) {
			dispatch(LOGIN_ERROR_AC('Wrong username/password combination'));
		}
	}, 2000);
};


const SIGNUP_AC = (): AppActions => ({ type: types.SIGNUP });

const SIGNUP_ERROR_AC = (payload: string): AppActions => ({ type: types.SIGNUP_ERROR, payload });

const SIGNUP_SUCCESS_AC = (payload: IUser): AppActions => ({ type: types.SIGNUP_SUCCESS, payload });

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


const LOGOUT_AC = (): AppActions => ({ type: types.LOGOUT });

const LOGOUT_ERROR_AC = (payload: string): AppActions => ({ type: types.LOGOUT_ERROR, payload });

const LOGOUT_SUCCESS_AC = (): AppActions => ({ type: types.LOGOUT_SUCCESS });

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