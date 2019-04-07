import { Reducer } from 'redux';
import { IUser } from './user';
import * as types from '../constants/profile';
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
		case types.GET_SINGLE_USER:
			return {
				...state,
				profile_user: actions.payload,
				loading_profile_user: false
			};
		case types.LOADING_SINGLE_USER:
			return {
				...state,
				loading_profile_user: true,
				user_error: ''
			};
		case types.EDIT_USER:
			return {
				...state,
				profile_user: actions.payload
			};
		case types.REMOVE_USER:
			return {
				...state,
				profile_user: null
			};
		case types.SINGLE_USER_ERROR:
			return {
				...state,
				user_error: actions.payload
			};
		default:
			return state;
	}
};
