import axios from 'axios';
import { IFormValues } from '../../../components/forms/formFields';
import { AppActions, AppThunk } from '../../config';
import * as types from '../../constants/recipe';
import { IRecipe } from '../../reducers/recipe';

export const getAllUserRecipesThunk = (id: string): AppThunk<void> => (dispatch) => {
	dispatch<AppActions>({ type: types.LOADING_RECIPES });
	setTimeout(async () => {
		try {
			const allRecipes = await axios.get(`/cookbook/recipe/user_recipes/?user_id=${id}`);
			dispatch<AppActions>({
				type: types.ALL_USER_RECIPES,
				payload: allRecipes.data.map((recipe: IRecipe): IRecipe => {
					const ingred = recipe.ingredients;
					const parsedIngredients = (ingred as string).replace(/'/g, '"');
					return {...recipe, ingredients: JSON.parse(parsedIngredients)};
				}),
			});
		} catch (error) {
			console.log(error);
			dispatch<AppActions>({ type: types.ALL_RECIPES_ERROR, payload: 'Failed to load user recipes' });
		}
	}, 1200);
};

export const getSingleRecipeThunk = (recipeId: string): AppThunk<void> => (dispatch) => {
	dispatch<AppActions>({ type: types.LOADING_SINGLE_RECIPE });
	setTimeout(async () => {
		try {
			const singleRecipe = await axios.get(`/cookbook/recipe/${recipeId}`);
			dispatch<AppActions>({
				type: types.SINGLE_RECIPE,
				payload: {
					...singleRecipe.data,
					ingredients: JSON.parse((singleRecipe.data.ingredients as string).replace(/'/g, '"')),
				},
			});
		} catch (error) {
			dispatch<AppActions>({ type: types.SINGLE_RECIPE_ERROR, payload: 'Failed to get single recipe' });
		}
	}, 1200);
};

export const editRecipeThunk = (recipeId: string, updatedRecipe: FormData): AppThunk<void> => async (dispatch) => {
	dispatch<AppActions>({ type: types.EDIT_LOADING });
	try {
		await axios.patch(`/cookbook/recipe/${recipeId}/`, updatedRecipe, {
			headers: {
				'Content-Type': 'multipart/form-data',
				'Accept': 'application/json',
			},
		});
		dispatch<AppActions>({ type: types.EDIT_RECIPE });
		return true;
	} catch (err) {
		dispatch<AppActions>({ type: types.EDIT_RECIPE_ERROR, payload: 'Failed to edit recipe' });
		return false;
	}
};

export const resetEditRecipe = (): AppThunk<void> => (dispatch) =>
	dispatch<AppActions>({ type: types.RESET_RECIPE_EDIT });
