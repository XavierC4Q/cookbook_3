import axios from 'axios';
import { Thunk } from 'typesafe-actions';
import {
    IUserFollow, 
    SingleUserActionType as SingleUser, 
    MultiUserActionType as MultiUser 
} from './types';
import { IUser } from '../auth/types';

export const GetProfileOwnerAction = (id: string): Thunk<void> => (dispatch) => {
    dispatch(SingleUser.request());
    setTimeout(async () => {
        try {
            const user = await axios.get(`/cookbook/user/${id}/`);
            dispatch(SingleUser.success(user.data));
        } catch (error) {
            dispatch(SingleUser.failure('Failed to get profile owner'));
        }
    }, 1000);
};

export const GetFollowersAction = (id: string): Thunk<void> => async (dispatch) => {
    dispatch(MultiUser.request());
    try {
        const follows = await axios.get(`/cookbook/follow/user_follows/?user_id=${id}`);
        dispatch(MultiUser.success(follows.data));
    } catch (err) {
        dispatch(MultiUser.failure('Failed to load favorites'));
    }
};