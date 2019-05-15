import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { SingleUserActionType as SingleUser, MultiUserActionType as MultiUsers, IUserFollow, IUserFavorite, MultiUserTypes } from './types';
import { IUser } from '../auth/types';

const singleUser = createReducer(null as null | IUser).handleAction(SingleUser.success, (state, action) => action.payload);

const listOfUsers = createReducer([] as MultiUserTypes).handleAction(MultiUsers.success, (state, action) => action.payload);

const loadingSingleUser = createReducer(false as boolean)
    .handleAction(SingleUser.request, () => true)
    .handleAction([SingleUser.success, SingleUser.failure], () => false);

const loadingUsers = createReducer(false as boolean)
    .handleAction(MultiUsers.request, () => true)
    .handleAction([MultiUsers.success, MultiUsers.failure], () => false);

const singleUserError = createReducer('' as string)
    .handleAction([SingleUser.request, SingleUser.success], () => '')
    .handleAction(SingleUser.failure, (state, action) => action.payload);

const listOfUsersError = createReducer('' as string)
    .handleAction([MultiUsers.request, MultiUsers.success], () => '')
    .handleAction(MultiUsers.failure, (state, action) => action.payload);

const UserReducer = combineReducers({
    singleUser,
    users: listOfUsers,
    loadingSingleUser,
    loadingUsers,
    singleUserError,
    usersError: listOfUsersError,
});

export default UserReducer;

export type UserState = ReturnType<typeof UserReducer>;