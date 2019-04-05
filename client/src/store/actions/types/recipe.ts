import { ADD_RECIPE, ALL_USER_RECIPES, EDIT_RECIPE, REMOVE_RECIPE, SINGLE_RECIPE } from '../../constants/recipe';

export type RecipeActions =
	| typeof ADD_RECIPE
	| typeof ALL_USER_RECIPES
	| typeof EDIT_RECIPE
	| typeof REMOVE_RECIPE
	| typeof SINGLE_RECIPE;
