import axios from 'axios';
import { Thunk } from 'typesafe-actions';
import {
	ICredentials,
	INewUserCredentials,
	LoggedInUserActionType as LoggedIn,
	LoginActionType as Login,
	LogoutActionType as Logout,
	SignUpActionType as SignUp,
} from './types';

export const LoggedInAction = (): Thunk<void> => (dispatch) => {
	dispatch(LoggedIn.request());
    setTimeout( async () => {
	try {
		const loggedInUser = await axios.get('/rest_auth/user/');
			localStorage.setItem('user', JSON.stringify(loggedInUser.data));
			dispatch(LoggedIn.success(loggedInUser.data));
        } catch (err) {
            dispatch(LoggedIn.failure(''));
        }
    }, 1200);
};

export const LoginUserAction = (info: ICredentials): Thunk<void> => async (dispatch) => {
	dispatch(Login.request());
    setTimeout(async () => {
	try {
		await axios.post('/rest_auth/login/', info);
		const loggedInUser = await axios.get('/rest_auth/user/');
			localStorage.setItem('user', JSON.stringify(loggedInUser.data));
			dispatch(Login.success(loggedInUser.data));
        } catch (err) {
            dispatch(Login.failure('Failed to login'));
        }
    }, 1200);
};

export const LogoutUserAction = (): Thunk<void> => async (dispatch) => {
	dispatch(Logout.request());
	try {
		await axios.post('/rest_auth/logout/');
		localStorage.removeItem('user');
		dispatch(Logout.success());
	} catch (err) {
		dispatch(Logout.failure('Failed to logout'));
	}
};

export const SignUpUserAction = (info: INewUserCredentials): Thunk<void> => (dispatch) => {
	dispatch(SignUp.request());
    setTimeout(async () => {
	try {
		await axios.post('/rest_auth/signup/', info);
		const newUser = await axios.get('/rest_auth/user/');
			localStorage.setItem('user', JSON.stringify(newUser.data));
			dispatch(SignUp.success(newUser.data));
        } catch (err) {
            dispatch(SignUp.failure('Failed to signup'));
        }
    }, 1200);
};
