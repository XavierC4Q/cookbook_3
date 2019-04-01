import { ADD_RECIPE, ALL_USER_RECIPES, EDIT_RECIPE, REMOVE_RECIPE, SINGLE_RECIPE } from '../../constants/recipe';
import { Action } from 'redux';
import { IRecipe } from '../../reducers/recipe';

interface IAddRecipeAction extends Action<typeof ADD_RECIPE> {
	newRecipe: IRecipe;
}

interface IAllUserRecipesAction extends Action<typeof ALL_USER_RECIPES> {
	allRecipes: Array<IRecipe>;
}

interface IEditRecipeAction extends Action<typeof EDIT_RECIPE> {}

interface IRemoveRecipeAction extends Action<typeof REMOVE_RECIPE> {}

interface ISingleRecipeAction extends Action<typeof SINGLE_RECIPE> {
	recipe: IRecipe;
}

type RecipesUnion =
	| IAddRecipeAction
	| IAllUserRecipesAction
	| IEditRecipeAction
	| IRemoveRecipeAction
	| ISingleRecipeAction;

export type RecipeActions = RecipesUnion;
