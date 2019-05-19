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

export const TAuthenticateAction = createAsyncAction(
	'@@auth/AUTHENTICATE REQUEST',
	'@@auth/AUTHENTICATE SUCCESS',
	'@@auth/AUTHENTICATE ERROR'
)<undefined, IUser, string>();

export const TLogoutAction = createAsyncAction(
    '@@auth/LOGOUT REQUEST',
	'@@auth/LOGOUT SUCCESS',
	'@@auth/LOGOUT ERROR',
)<undefined, undefined, string>();



const AuthActionTypes = {
    TAuthenticateAction,
    TLogoutAction,
}

export default AuthActionTypes;