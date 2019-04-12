import axios from 'axios';
import { AppActions, AppThunk } from '../../config';
import * as types from '../../constants/recipe';
import { IRecipe } from '../../reducers/recipe';

export const getAllUserRecipesThunk = (id: string): AppThunk<void> => (dispatch) => {
	dispatch<AppActions>({ type: types.LOADING_RECIPES });
	setTimeout(async () => {
		try {
			const allRecipes = await axios.get(`/cookbook/recipe/user_recipes/?user_id=${id}`);
			dispatch<AppActions>({ type: types.ALL_USER_RECIPES, payload: allRecipes.data });
		} catch (error) {
			dispatch<AppActions>({ type: types.ALL_RECIPES_ERROR, payload: 'Failed to load user recipes' });
		}
	}, 1200);
};

export const getSingleRecipeThunk = (recipeId: string): AppThunk<void> => (dispatch) => {
	dispatch<AppActions>({ type: types.LOADING_SINGLE_RECIPE });
	setTimeout(async () => {
		try {
			const singleRecipe = await axios.get(`/cookbook/recipe/${recipeId}`);
			dispatch<AppActions>({ type: types.SINGLE_RECIPE, payload: singleRecipe.data });
		} catch (error) {
			dispatch<AppActions>({ type: types.SINGLE_RECIPE_ERROR, payload: 'Failed to get single recipe' });
		}
	}, 1200);
};
