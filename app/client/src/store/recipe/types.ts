import { IUser } from '../auth/types';
import { createAsyncAction, createStandardAction } from 'typesafe-actions';

export interface IRecipe {
	readonly id: number;
	readonly owner: IUser;
	recipe_name: string;
	readonly created: Date;
	readonly updated: Date;
	ingredients: string[] | string;
	readonly favorite_count: number;
	description: string;
	image: string | undefined;
}

export interface INewRecipe {
	id: string;
	data: FormData;
}

export interface IRecipeFormValues {
	recipe_name: string;
	ingredients: string[];
	description: string;
	image: File | string;
}

export interface IRecipeFavorite {
	id: number;
	favorited_by: IUser;
	recipe: IRecipe;
	favorited_on: Date;
}

export type TRecipe = IRecipe[] | IRecipeFavorite[];

export const TRecipeListAction = createAsyncAction(
	'@@recipe/ALL USER RECIPES REQUEST',
	'@@recipe/ALL USER RECIPES SUCCESS',
	'@@recipe/ALL USER RECIPES ERROR',
)<undefined, TRecipe, string>();

export const TSingleRecipeAction = createAsyncAction(
	'@@recipe/SINGLE RECIPE REQUEST',
	'@@recipe/SINGLE RECIPE SUCCESS',
	'@@recipe/SINGLE RECIPE ERROR',
)<undefined, IRecipe, string>();


export const FavoriteRecipe = { 
    TFavoriteRecipeFailure: createStandardAction('@@recipe/FAVORITE FAILURE')(), 
    TFavoriteRecipeSuccess: createStandardAction('@@recipe/FAVORITE SUCCESS')(),
};

export const UnfavoriteRecipe = { 
    TUnfavoriteRecipeFailure: createStandardAction('@@recipe/UNFAVORITE FAILURE')(), 
    TUnfavoriteRecipeSuccess: createStandardAction('@@recipe/UNFAVORITE SUCCESS')(), 
};

const RecipeActionTypes = {
	TRecipeListAction,
    TSingleRecipeAction,
    FavoriteRecipe,
    UnfavoriteRecipe
};

export default RecipeActionTypes;
