import * as types from '../../constants/recipe';

export type RecipeActionTypes =
	| typeof types.ADD_RECIPE
	| typeof types.ALL_USER_RECIPES
	| typeof types.EDIT_RECIPE
	| typeof types.REMOVE_RECIPE
	| typeof types.SINGLE_RECIPE
	| typeof types.LOADING_RECIPES
	| typeof types.LOADING_SINGLE_RECIPE
	| typeof types.EDIT_LOADING
	| typeof types.ALL_RECIPES_ERROR
	| typeof types.SINGLE_RECIPE_ERROR
	| typeof types.EDIT_RECIPE_ERROR
	| typeof types.REMOVE_RECIPE_ERROR
	| typeof types.ADD_RECIPE_LOADING
	| typeof types.ADD_RECIPE_ERROR
	| typeof types.RESET_RECIPE_EDIT;
