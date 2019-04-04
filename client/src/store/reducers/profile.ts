import { Reducer } from 'redux';
import { ProfileActions } from '../actions/types/profile';
import { IUser } from './user';
import { GET_SINGLE_USER, EDIT_USER, REMOVE_USER, LOADING_SINGLE_USER, SINGLE_USER_ERROR } from '../constants/profile';

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

export const profileReducer: Reducer<IProfileState, ProfileActions> = (state = initialState, actions) => {
	switch (actions.type) {
		case GET_SINGLE_USER:
			return {
				...state,
				profile_user: actions.user,
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
				profile_user: actions.updated_user
			};
		case REMOVE_USER:
			return {
				...state,
				profile_user: null
			};
		case SINGLE_USER_ERROR:
			return {
				...state,
				user_error: actions.user_error
			};
		default:
			return state;
	}
};
