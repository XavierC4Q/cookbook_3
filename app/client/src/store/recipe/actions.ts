import axios from 'axios';
import { Thunk } from 'typesafe-actions';
import { IUser } from '../auth/types';
import { IRecipe, INewRecipe, TSingleRecipeAction, TRecipeListAction, FavoriteRecipe, UnfavoriteRecipe } from './types';

/**
 * 
 * The JSONField for Django stores arrays with single quotes. This throws an error when
 * the JSON is parsed on the client side (expects double quoted JSON). Thus the ingredients
 * have to be handled by replacing the qoutes and parsing before the dispatch.
 */

export const GetUserRecipesAction = (id: string): Thunk<void> => (dispatch) => {
	dispatch(TRecipeListAction.request());
	setTimeout(async () => {
		try {
			const allRecipes = await axios.get(`/cookbook/recipe/user_recipes/?user_id=${id}`);
			dispatch(
				TRecipeListAction.success(
					allRecipes.data.map((recipe: IRecipe): IRecipe => {
						const ingred = recipe.ingredients;
						const parsedIngredients = (ingred as string).replace(/'/g, '"');
						return { ...recipe, ingredients: JSON.parse(parsedIngredients) };
					}),
				),
			);
		} catch (err) {
			dispatch(TRecipeListAction.failure('Failed to load user recipes'));
		}
	}, 1200);
};

export const GetSingleRecipeAction = (id: string): Thunk<void> => (dispatch) => {
	dispatch(TSingleRecipeAction.request());
	setTimeout(async () => {
		try {
			const recipe = await axios.get(`/cookbook/recipe/${id}`);
			dispatch(
				TSingleRecipeAction.success({
					...recipe.data,
					ingredients: JSON.parse((recipe.data.ingredients as string).replace(/'/g, '"')),
				}),
			);
		} catch (err) {
			dispatch(TSingleRecipeAction.failure('Failed to load single recipe'));
		}
	}, 1200);
};

export const EditRecipeAction = (recipe: INewRecipe): Thunk<void> => (dispatch) => {
	dispatch(TSingleRecipeAction.request());
	setTimeout(async () => {
		try {
			await axios.patch(`/cookbook/recipe/${recipe.id}/`, recipe.data, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Accept: 'application/json',
				},
			});
			const updatedRecipe = await axios.get(`/cookbook/recipe/${recipe.id}`);
			dispatch(
				TSingleRecipeAction.success({
					...updatedRecipe.data,
					ingredients: JSON.parse((updatedRecipe.data.ingredients as string).replace(/'/g, '"')),
				}),
			);
		} catch (err) {
			dispatch(TSingleRecipeAction.failure('Failed to properly edit recipe'));
		}
	}, 1200);
};

export const FavoriteRecipeAction = (favoritedBy: IUser, recipe: IRecipe): Thunk<void> => async (dispatch) => {
	console.log('FAVORITED BY', favoritedBy)
	try {
		await axios.post('/cookbook/favorite/',  {
			data: {
				favorited_by: favoritedBy,
				recipe,
			},
			headers: {
				'Content-Type': 'multipart/form-data',
				Accept: 'application/json',
			},
		});
		dispatch(FavoriteRecipe.TFavoriteRecipeSuccess());
	} catch (err) {
		dispatch(FavoriteRecipe.TFavoriteRecipeFailure());
	}
};

export const UnFavoriteRecipeAction = (id: number): Thunk<void> => async (dispatch) => {
	try {
		await axios.delete(`/cookbook/favorite/${id}`);
		dispatch(UnfavoriteRecipe.TUnfavoriteRecipeSuccess());
	} catch (err) {
		dispatch(UnfavoriteRecipe.TUnfavoriteRecipeFailure());
	}
};
