import { IUser } from '../auth/types';
import { createAsyncAction } from 'typesafe-actions';

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


export const AllUserRecipeActionType = createAsyncAction(
    '@@recipe/ALL USER RECIPES REQUEST',
    '@@recipe/ALL USER RECIPES SUCCESS',
    '@@recipe/ALL USER RECIPES ERROR'
)<undefined, IRecipe[], string>();

export const SingleRecipeActionType = createAsyncAction(
    '@@recipe/SINGLE RECIPE REQUEST',
    '@@recipe/SINGLE RECIPE SUCCESS',
    '@@recipe/SINGLE RECIPE ERROR'
)<undefined, IRecipe, string>();

const RecipeActionTypes = {
    AllUserRecipeActionType,
    SingleRecipeActionType
};

export default RecipeActionTypes;