import axios from 'axios';
import { Thunk } from 'typesafe-actions';
import {
	IRecipe,
	INewRecipe,
	SingleRecipeActionType as SingleRecipe,
	AllUserRecipeActionType as Recipes,
} from './types';

export const GetUserRecipesAction = (id: string): Thunk<void> => (dispatch) => {
	dispatch(Recipes.request());
	setTimeout(async () => {
		try {
			const allRecipes = await axios.get(`/cookbook/recipe/user_recipes/?user_id=${id}`);
			dispatch(
				Recipes.success(
					allRecipes.data.map((recipe: IRecipe): IRecipe => {
						const ingred = recipe.ingredients;
						const parsedIngredients = (ingred as string).replace(/'/g, '"');
						return { ...recipe, ingredients: JSON.parse(parsedIngredients) };
					}),
				),
			);
		} catch (err) {
			dispatch(Recipes.failure('Failed to load user recipes'));
		}
	}, 1200);
};

export const GetSingleRecipeAction = (id: string): Thunk<void> => (dispatch) => {
	dispatch(SingleRecipe.request());
	setTimeout(async () => {
		try {
			const recipe = await axios.get(`/cookbook/recipe/${id}`);
			dispatch(
				SingleRecipe.success({
					...recipe.data,
					ingredients: JSON.parse((recipe.data.ingredients as string).replace(/'/g, '"')),
				}),
			);
		} catch (err) {
			dispatch(SingleRecipe.failure('Failed to load single recipe'));
		}
	}, 1200);
};

export const EditRecipeAction = (recipe: INewRecipe): Thunk<void> => (dispatch) => {
	dispatch(SingleRecipe.request());
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
				SingleRecipe.success({
					...updatedRecipe.data,
					ingredients: JSON.parse((updatedRecipe.data.ingredients as string).replace(/'/g, '"')),
				}),
            );
		} catch (err) {
            dispatch(SingleRecipe.failure('Failed to properly edit recipe'));
		}
	}, 1200);
};
