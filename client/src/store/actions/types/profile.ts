import {
	GET_SINGLE_USER,
	EDIT_USER,
	REMOVE_USER,
	LOADING_SINGLE_USER,
	SINGLE_USER_ERROR
} from '../../constants/profile';

export type ProfileActions =
	| typeof GET_SINGLE_USER
	| typeof EDIT_USER
	| typeof REMOVE_USER
	| typeof LOADING_SINGLE_USER
	| typeof SINGLE_USER_ERROR;
