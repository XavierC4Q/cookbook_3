import axios from 'axios';
import { AppThunk, AppActions } from '../../config';
import {
	GET_SINGLE_USER,
	EDIT_USER,
	REMOVE_USER,
	SINGLE_USER_ERROR,
	LOADING_SINGLE_USER
} from '../../constants/profile';
import { IUser } from '../../reducers/user';


const LOADING_SINGLE_USER_AC = (): AppActions => ({ type: LOADING_SINGLE_USER });

const SINGLE_USER_ERROR_AC = (payload: string): AppActions => ({ type: SINGLE_USER_ERROR, payload });

const GET_SINGLE_USER_AC = (payload: IUser): AppActions => ({ type: GET_SINGLE_USER, payload });

export const getSingleUserThunk = (id: string): AppThunk<Promise<void>> => async dispatch => {
	dispatch(LOADING_SINGLE_USER_AC());
	try {
		const singleUser = await axios.get(`/cookbook/user/${id}/`);
		dispatch(GET_SINGLE_USER_AC(singleUser.data));
	} catch (error) {
		dispatch(SINGLE_USER_ERROR_AC(`Failed to get user with id: ${id}`));
	}
};


const EDIT_USER_AC = (payload: IUser): AppActions => ({ type: EDIT_USER, payload });

export const editUserThunk = (updateInfo: Partial<IUser>): AppThunk<Promise<void>> => async dispatch => {
	try {
		const updateUser = await axios.patch(`/cookbook/user/${updateInfo.id}/`);
		dispatch(EDIT_USER_AC(updateUser.data));
	} catch (error) {
		dispatch(SINGLE_USER_ERROR_AC('Failed to eedit user'));
	}
};