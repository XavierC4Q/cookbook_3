import { createAsyncAction } from 'typesafe-actions';
import { IUser } from '../auth/types';
import { IRecipe } from '../recipe/types';

export interface IUserFollow {
    id: number;
    followed_on: Date;
    user: IUser;
    follows: IUser;
}

export interface IUserFavorite {
    id: number;
    favorited_by: IUser;
    recipe: IRecipe;
    favorited_on: Date;
}

export type MultiUserTypes = IUser[] | IUserFavorite[] | IUserFollow[];

export const SingleUserActionType = createAsyncAction(
    '@@profile/SINGLE USER REQUEST',
    '@@profile/SINGLE USER SUCCESS',
    '@@profile/SINGLE USER ERROR'
)<undefined, IUser, string>();

export const MultiUserActionType = createAsyncAction(
    '@@profile/USERS REQUEST',
    '@@profile/USERS SUCCESS',
    '@@profile/USERS ERROR'
)<undefined, MultiUserTypes, string>();

const UserActionTypes = {
    SingleUserActionType,
    MultiUserActionType,
};

export default UserActionTypes;