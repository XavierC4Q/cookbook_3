import * as types from '../../constants/profile';

export type ProfileActionTypes =
	| typeof types.GET_SINGLE_USER
	| typeof types.EDIT_USER
	| typeof types.REMOVE_USER
	| typeof types.LOADING_SINGLE_USER
	| typeof types.SINGLE_USER_ERROR;
