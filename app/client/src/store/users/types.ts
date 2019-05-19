import { createAsyncAction } from 'typesafe-actions';
import { IUser } from '../auth/types';

export interface IUserFollow {
    id: number;
    followed_on: Date;
    user: IUser;
    follows: IUser;
}

export type TUserTypes = IUser[] | IUserFollow[];

export const TSingleUserAction = createAsyncAction(
    '@@profile/SINGLE USER REQUEST',
    '@@profile/SINGLE USER SUCCESS',
    '@@profile/SINGLE USER ERROR'
)<undefined, IUser, string>();

export const TUserListAction = createAsyncAction(
    '@@profile/USERS REQUEST',
    '@@profile/USERS SUCCESS',
    '@@profile/USERS ERROR'
)<undefined, TUserTypes, string>();

const UserActionTypes = {
    TSingleUserAction,
    TUserListAction,
};

export default UserActionTypes;