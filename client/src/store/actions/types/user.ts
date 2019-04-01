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
import { Action } from 'redux';
import { IUser } from '../../reducers/user';

interface ILoggedInUser extends Action<typeof LOGGED_IN_USER> {
	loggedInUser: IUser;
}

interface ILoginAction extends Action<typeof LOGIN> {}

interface ILoginSuccessAction extends Action<typeof LOGIN_SUCCESS> {
	user: IUser;
}

interface ILoginErrorAction extends Action<typeof LOGIN_ERROR> {
	login_error: string;
}

interface ISignUpAction extends Action<typeof SIGNUP> {}

interface ISignUpSuccessAction extends Action<typeof SIGNUP_SUCCESS> {
	newUser: IUser;
}

interface ISignUpErrorAction extends Action<typeof SIGNUP_ERROR> {
	signup_error: string;
}

interface ILogoutAction extends Action<typeof LOGOUT> {}

interface ILogoutSuccessAction extends Action<typeof LOGOUT_SUCCESS> {}

interface ILogoutErrorAction extends Action<typeof LOGOUT_ERROR> {
	logout_error: string;
}

type LoginUnion = ILoginAction | ILoginSuccessAction | ILoginErrorAction;

type SignUpUnion = ISignUpAction | ISignUpSuccessAction | ISignUpErrorAction;

type LogoutUnion = ILogoutAction | ILogoutSuccessAction | ILogoutErrorAction;

export type UserActions = LoginUnion | SignUpUnion | LogoutUnion | ILoggedInUser;
