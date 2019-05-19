import axios from 'axios';
import { Thunk } from 'typesafe-actions';
import {
    IUserFollow, 
    TSingleUserAction, 
    TUserListAction
} from './types';
import { IUser } from '../auth/types';

export const GetProfileOwnerAction = (id: string): Thunk<void> => (dispatch) => {
    dispatch(TSingleUserAction.request());
    setTimeout(async () => {
        try {
            const user = await axios.get(`/cookbook/user/${id}/`);
            dispatch(TSingleUserAction.success(user.data));
        } catch (error) {
            dispatch(TSingleUserAction.failure('Failed to get profile owner'));
        }
    }, 1000);
};

export const GetFollowersAction = (id: string): Thunk<void> => async (dispatch) => {
    dispatch(TUserListAction.request());
    try {
        const follows = await axios.get(`/cookbook/follow/user_follows/?user_id=${id}`);
        dispatch(TUserListAction.success(follows.data));
    } catch (err) {
        dispatch(TUserListAction.failure('Failed to load favorites'));
    }
};