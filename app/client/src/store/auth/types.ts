import { createAsyncAction } from 'typesafe-actions';

export interface ICredentials {
	username: string;
    password: string;
}

export interface INewUserCredentials {
    username: string;
    password1: string;
    password2: string;
    country: string;
    email?: string;
}

export interface IUser {
	readonly id: number;
	username: string;
	email: string;
	country: string;
	readonly date_joined: Date;
	readonly last_login: Date;
	readonly total_followers: number;
	readonly total_recipes: number;
	readonly total_favorites: number;
	profile_image: string | null;
}

export const LoggedInUserActionType = createAsyncAction(
    '@@auth/LOGGED IN USER REQUEST',
	'@@auth/LOGGED IN USER SUCCESS',
	'@@auth/LOGGED IN USER ERROR',
)<undefined, IUser, string>();

export const LoginActionType = createAsyncAction(
    '@@auth/LOGIN REQUEST',
	'@@auth/LOGIN SUCCESS',
	'@@auth/LOGIN ERROR',
)<undefined, IUser, string>();

export const LogoutActionType = createAsyncAction(
    '@@auth/LOGOUT REQUEST',
	'@@auth/LOGOUT SUCCESS',
	'@@auth/LOGOUT ERROR',
)<undefined, undefined, string>();

export const SignUpActionType = createAsyncAction(
    '@@auth/SIGNUP REQUEST',
	'@@auth/SIGNUP SUCCESS',
	'@@auth/SIGNUP ERROR',
)<undefined, IUser, string>();


const AuthActionTypes = {
    LoginActionType,
    LogoutActionType,
    LoggedInUserActionType,
    SignUpActionType
}

export default AuthActionTypes;