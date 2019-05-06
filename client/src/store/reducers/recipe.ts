import { Reducer } from 'redux';
import { AppActions } from '../config';
import * as types from '../constants/recipe';
import { IUser } from './user';

export interface IRecipe {
	id: number;
	owner: IUser;
	recipe_name: string;
	created: Date;
	updated: Date;
	ingredients: string[];
	favorite_count: number;
	description: string;
	image?: string | null | undefined;
}

export interface IRecipeState {
	all_user_recipes: IRecipe[];
	single_recipe: IRecipe | null;
	add_recipe_success: boolean;
	all_recipes_loading: boolean;
	all_recipes_err: string;
	single_recipe_loading: boolean;
	single_recipe_err: string;
	edit_recipe_loading: boolean;
	edit_recipe_success: boolean;
	edit_recipe_err: string;
	remove_recipe_success: boolean;
	remove_recipe_err: string;
	add_recipe_loading: boolean;
	add_recipe_err: string;
}

const initialState: IRecipeState = {
	all_recipes_err: '',
	all_recipes_loading: false,
	all_user_recipes: [],
	single_recipe: null,
	single_recipe_err: '',
	single_recipe_loading: false,
	edit_recipe_err: '',
	edit_recipe_loading: false,
	edit_recipe_success: false,
	remove_recipe_err: '',
	remove_recipe_success: false,
	add_recipe_success: false,
	add_recipe_err: '',
	add_recipe_loading: false,
};

export const recipeReducer: Reducer<IRecipeState, AppActions> = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.ALL_USER_RECIPES:
			return {
				...state,
				all_user_recipes: payload,
				all_recipes_loading: false,
			};
		case types.LOADING_RECIPES:
			return {
				...state,
				all_recipes_loading: true,
				all_recipes_err: '',
			};
		case types.ALL_RECIPES_ERROR:
			return {
				...state,
				all_recipes_loading: false,
				all_recipes_err: payload,
			};
		case types.ADD_RECIPE:
			return {
				...state,
				all_user_recipes: [ ...state.all_user_recipes, payload ],
				add_recipe_success: true,
				add_recipe_pending: false,
			};
		case types.ADD_RECIPE_LOADING:
			return {
				...state,
				add_recipe_loading: true,
				add_recipe_err: '',
			};
		case types.ADD_RECIPE_ERROR:
			return {
				...state,
				add_recipe_loading: false,
				add_recipe_err: payload,
			};
		case types.EDIT_RECIPE:
			return {
				...state,
				edit_recipe_success: true,
				edit_recipe_loading: false,
			};
		case types.EDIT_LOADING:
			return {
				...state,
				edit_recipe_loading: true,
				edit_recipe_err: '',
			};
		case types.EDIT_RECIPE_ERROR:
			return {
				...state,
				edit_recipe_loading: false,
				edit_recipe_err: payload,
			};
		case types.REMOVE_RECIPE:
			return {
				...state,
				remove_recipe_success: true,
				remove_recipe_err: '',
			};
		case types.REMOVE_RECIPE_ERROR:
			return {
				...state,
				remove_recipe_err: payload,
			};
		case types.SINGLE_RECIPE:
			return {
				...state,
				single_recipe: payload,
				single_recipe_loading: false,
			};
		case types.LOADING_SINGLE_RECIPE:
			return {
				...state,
				single_recipe_loading: true,
				single_recipe_err: '',
				single_recipe: null,
			};
		case types.SINGLE_RECIPE_ERROR:
			return {
				...state,
				single_recipe_loading: false,
				single_recipe_err: payload,
			};
		case types.RESET_RECIPE_EDIT:
			return {
				...state,
				edit_recipe_success: false,
			};
		default:
			return state;
	}
};
