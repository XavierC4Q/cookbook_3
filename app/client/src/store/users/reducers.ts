import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { TSingleUserAction, TUserListAction, TUserTypes } from './types';
import { IUser } from '../auth/types';

const singleUser = createReducer(null as null | IUser).handleAction(
	TSingleUserAction.success,
	(state, action) => action.payload,
);

const listOfUsers = createReducer([] as TUserTypes).handleAction(
	TUserListAction.success,
	(state, action) => action.payload,
);

const loadingSingleUser = createReducer(false as boolean)
	.handleAction(TSingleUserAction.request, () => true)
	.handleAction([ TSingleUserAction.success, TSingleUserAction.failure ], () => false);

const loadingUsers = createReducer(false as boolean)
	.handleAction(TUserListAction.request, () => true)
	.handleAction([ TUserListAction.success, TUserListAction.failure ], () => false);

const singleUserError = createReducer('' as string)
	.handleAction([ TSingleUserAction.request, TSingleUserAction.success ], () => '')
	.handleAction(TSingleUserAction.failure, (state, action) => action.payload);

const listOfUsersError = createReducer('' as string)
	.handleAction([ TUserListAction.request, TUserListAction.success ], () => '')
	.handleAction(TUserListAction.failure, (state, action) => action.payload);

const UserReducer = combineReducers({
	singleUser,
	users: listOfUsers,
	loadingSingleUser,
	loadingUsers,
	singleUserError,
	usersError: listOfUsersError,
});

export default UserReducer;

export type TUserState = ReturnType<typeof UserReducer>;
