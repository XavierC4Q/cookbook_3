import { createAsyncAction } from 'typesafe-actions';
import { IUser } from '../auth/types';

export const SingleUserActionType = createAsyncAction(
    '@@profile/SINGLE USER REQUEST',
    '@@profile/SINGLE USER SUCCESS',
    '@@profile/SINGLE USER ERROR'
)<undefined, IUser, string>();

export const MultiUserActionType = createAsyncAction(
    '@@profile/USERS REQUEST',
    '@@profile/USERS SUCCESS',
    '@@profile/USERS ERROR'
)<undefined, IUser[], string>();

const UserActionTypes = {
    SingleUserActionType,
    MultiUserActionType,
};

export default UserActionTypes;