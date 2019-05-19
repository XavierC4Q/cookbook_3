import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { IRecipe, TRecipeListAction, TSingleRecipeAction, TRecipe, FavoriteRecipe, UnfavoriteRecipe } from './types';

const recipeList = createReducer([] as TRecipe).handleAction(
	TRecipeListAction.success,
	(state, action) => action.payload,
);

const recipeListLoading = createReducer(false as boolean)
	.handleAction(TRecipeListAction.request, (state, action) => true)
	.handleAction([ TRecipeListAction.success, TRecipeListAction.failure ], () => false);

const recipeListError = createReducer('' as string)
	.handleAction(TRecipeListAction.failure, (state, action) => action.payload)
	.handleAction([ TRecipeListAction.request, TRecipeListAction.success ], () => '');

const singleRecipe = createReducer(null as null | IRecipe).handleAction(
	TSingleRecipeAction.success,
	(state, action) => action.payload,
);

const singleRecipeLoading = createReducer(false as boolean)
	.handleAction(TSingleRecipeAction.request, (state, action) => true)
	.handleAction([ TSingleRecipeAction.success, TSingleRecipeAction.failure ], () => false);

const singleRecipeError = createReducer('' as string)
	.handleAction(TSingleRecipeAction.failure, (state, action) => action.payload)
	.handleAction([ TSingleRecipeAction.request, TSingleRecipeAction.success ], () => '');

const favoriteRecipe = createReducer('' as string)
	.handleAction([ FavoriteRecipe.TFavoriteRecipeSuccess, UnfavoriteRecipe.TUnfavoriteRecipeSuccess ], () => '')
	.handleAction(
		[ FavoriteRecipe.TFavoriteRecipeFailure, UnfavoriteRecipe.TUnfavoriteRecipeFailure ],
		() => 'Failed to do favorite recipe action',
	);

const RecipeReducer = combineReducers({
	recipeList,
	recipeListLoading,
	recipeListError,
	singleRecipe,
	singleRecipeLoading,
	singleRecipeError,
	favoriteRecipe,
});

export default RecipeReducer;

export type TRecipeState = ReturnType<typeof RecipeReducer>;
