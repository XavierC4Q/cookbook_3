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
import { UserThunk } from '../../reducers/user';

export type LoginCred = {
    username: String;
    password: String
};

export type SignUpCred = {
    username: String;
    password1: String;
    password2: String;
    country: String;
    email: String;
}

const LOGGED_IN_AC = (loggedInUser: IUser): UserActions => ({ type: LOGGED_IN_USER, loggedInUser });

const LOGIN_AC = (): UserActions => ({ type: LOGIN });

const LOGIN_ERR_AC = (login_error: String): UserActions => ({ type: LOGIN_ERROR, login_error });

const LOGIN_SUCCESS_AC = (user: IUser): UserActions => ({ type: LOGIN_SUCCESS, user });




export const loggedInThunk = (): UserThunk<Promise<boolean>> => async dispatch => {
    try {
        const loggedInUser = await axios.get('auth/user/');
        dispatch(LOGGED_IN_AC(loggedInUser.data));
        
        return true
    } catch (error) {
        return false
    }
};

export const loginThunk = (credentials: LoginCred): UserThunk<void> => async dispatch => {
    dispatch(LOGIN_AC());
    try {
        await axios.post('auth/login/', credentials);
        const user = await axios.get('auth/user/');
        dispatch(LOGIN_SUCCESS_AC(user.data));
    } catch (error) {
        dispatch(LOGIN_ERR_AC('Wrong username/password combination'));
    }
};
