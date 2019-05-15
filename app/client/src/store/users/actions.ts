import axios from 'axios';
import { Thunk } from 'typesafe-actions';
import { SingleUserActionType as SingleUser, MultiUserActionType as MultiUser } from './types';
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
    }, 1500);
};