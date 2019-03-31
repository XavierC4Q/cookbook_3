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

export interface ILoggedInUser extends Action<typeof LOGGED_IN_USER> {
    loggedInUser: IUser
};

export interface ILoginAction extends Action<typeof LOGIN> {};

export interface ILoginSuccessAction extends Action<typeof LOGIN_SUCCESS> {
    user: IUser
};

export interface ILoginErrorAction extends Action<typeof LOGIN_ERROR> {
    login_error: String
};

export interface ISignUpAction extends Action<typeof SIGNUP> {};

export interface ISignUpSuccessAction extends Action<typeof SIGNUP_SUCCESS> {
    newUser: IUser
};

export interface ISignUpErrorAction extends Action<typeof SIGNUP_ERROR> {
    signup_error: String
};

export interface ILogoutAction extends Action<typeof LOGOUT> {};

export interface ILogoutSuccessAction extends Action<typeof LOGOUT_SUCCESS> {};

export interface ILogoutErrorAction extends Action<typeof LOGOUT_ERROR> {
    logout_error: String
};

type LoginA = ILoginAction | ILoginSuccessAction | ILoginErrorAction;

type SignUpA = ISignUpAction | ISignUpSuccessAction | ISignUpErrorAction;

type LogoutA = ILogoutAction | ILogoutSuccessAction | ILogoutErrorAction


export type UserActions = LoginA | SignUpA | LogoutA | ILoggedInUser;