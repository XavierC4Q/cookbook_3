import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { IRecipe, AllUserRecipeActionType as AllRecipes, SingleRecipeActionType as SingleRecipe } from './types';

const recipeList = createReducer([] as IRecipe[]).handleAction(AllRecipes.success, (state, action) => action.payload);

const recipeListLoading = createReducer(false as boolean)
	.handleAction(AllRecipes.request, (state, action) => true)
	.handleAction([ AllRecipes.success, AllRecipes.failure ], () => false);

const recipeListError = createReducer('' as string)
	.handleAction(AllRecipes.failure, (state, action) => action.payload)
	.handleAction([ AllRecipes.request, AllRecipes.success ], () => '');

const singleRecipe = createReducer(null as null | IRecipe).handleAction(
	SingleRecipe.success,
	(state, action) => action.payload,
);

const singleRecipeLoading = createReducer(false as boolean)
	.handleAction(SingleRecipe.request, (state, action) => true)
	.handleAction([ SingleRecipe.success, SingleRecipe.failure ], () => false);

const singleRecipeError = createReducer('' as string)
	.handleAction(SingleRecipe.failure, (state, action) => action.payload)
	.handleAction([ SingleRecipe.request, SingleRecipe.success ], () => '');


const RecipeReducer = combineReducers({
    recipeList,
    recipeListLoading,
    recipeListError,
    singleRecipe,
    singleRecipeLoading,
    singleRecipeError,
});

export default RecipeReducer;

export type RecipeState = ReturnType<typeof RecipeReducer>;