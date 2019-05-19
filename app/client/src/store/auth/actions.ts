import axios from 'axios';
import { Thunk } from 'typesafe-actions';
import { ICredentials, INewUserCredentials, TAuthenticateAction, TLogoutAction } from './types';

export const LoggedInAction = (): Thunk<void> => (dispatch) => {
	dispatch(TAuthenticateAction.request());
	setTimeout(async () => {
		try {
			const loggedInUser = await axios.get('/rest_auth/user/');
			localStorage.setItem('user', JSON.stringify(loggedInUser.data));
			dispatch(TAuthenticateAction.success(loggedInUser.data));
		} catch (err) {
			dispatch(TAuthenticateAction.failure(''));
		}
	}, 1200);
};

export const LoginUserAction = (info: ICredentials): Thunk<void> => async (dispatch) => {
	dispatch(TAuthenticateAction.request());
	setTimeout(async () => {
		try {
			await axios.post('/rest_auth/login/', info);
			const loggedInUser = await axios.get('/rest_auth/user/');
			localStorage.setItem('user', JSON.stringify(loggedInUser.data));
			dispatch(TAuthenticateAction.success(loggedInUser.data));
		} catch (err) {
			dispatch(TAuthenticateAction.failure('Failed to login'));
		}
	}, 1200);
};

export const LogoutUserAction = (): Thunk<void> => async (dispatch) => {
	dispatch(TLogoutAction.request());
	try {
		await axios.post('/rest_auth/logout/');
		localStorage.removeItem('user');
		dispatch(TLogoutAction.success());
	} catch (err) {
		dispatch(TLogoutAction.failure('Failed to logout'));
	}
};

export const SignUpUserAction = (info: INewUserCredentials): Thunk<void> => (dispatch) => {
	dispatch(TAuthenticateAction.request());
	setTimeout(async () => {
		try {
			await axios.post('/rest_auth/signup/', info);
			const newUser = await axios.get('/rest_auth/user/');
			localStorage.setItem('user', JSON.stringify(newUser.data));
			dispatch(TAuthenticateAction.success(newUser.data));
		} catch (err) {
			dispatch(TAuthenticateAction.failure('Failed to signup'));
		}
	}, 1200);
};
