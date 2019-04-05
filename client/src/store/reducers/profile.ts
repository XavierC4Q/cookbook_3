import { Reducer } from 'redux';
import { IUser } from './user';
import { GET_SINGLE_USER, EDIT_USER, REMOVE_USER, LOADING_SINGLE_USER, SINGLE_USER_ERROR } from '../constants/profile';
import { AppActions } from '../config';

export interface IProfileState {
	profile_user: IUser | null;
	loading_profile_user: boolean;
	user_error: string;
}

const initialState: IProfileState = {
	profile_user: null,
	loading_profile_user: false,
	user_error: ''
};

export const profileReducer: Reducer<IProfileState, AppActions> = (state = initialState, actions) => {
	switch (actions.type) {
		case GET_SINGLE_USER:
			return {
				...state,
				profile_user: actions.payload,
				loading_profile_user: false
			};
		case LOADING_SINGLE_USER:
			return {
				...state,
				loading_profile_user: true,
				user_error: ''
			};
		case EDIT_USER:
			return {
				...state,
				profile_user: actions.payload
			};
		case REMOVE_USER:
			return {
				...state,
				profile_user: null
			};
		case SINGLE_USER_ERROR:
			return {
				...state,
				user_error: actions.payload
			};
		default:
			return state;
	}
};
