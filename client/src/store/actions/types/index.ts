import { Action } from 'redux';
import { UserActions } from './user';
import { ProfileActions } from './profile';
import { RecipeActions } from './recipe';

export interface PayloadAction<T extends Action<UserActions & ProfileActions & RecipeActions>, P = any> {
	type: T;
	payload?: P;
}
