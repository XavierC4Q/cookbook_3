import {
	GET_SINGLE_USER,
	EDIT_USER,
	REMOVE_USER,
	LOADING_SINGLE_USER,
	SINGLE_USER_ERROR
} from '../../constants/profile';
import { Action } from 'redux';
import { IUser } from '../../reducers/user';

interface IGetSingleUserAction extends Action<typeof GET_SINGLE_USER> {
	user: IUser;
}

interface IEditUserAction extends Action<typeof EDIT_USER> {
	updated_user: IUser;
}

interface IRemoveUserAction extends Action<typeof REMOVE_USER> {}

interface ILoadingSingleUserAction extends Action<typeof LOADING_SINGLE_USER> {}

interface ISingleUserError extends Action<typeof SINGLE_USER_ERROR> {
	user_error: string;
}

export type ProfileActions =
	| IGetSingleUserAction
	| IEditUserAction
	| IRemoveUserAction
	| ILoadingSingleUserAction
	| ISingleUserError;
