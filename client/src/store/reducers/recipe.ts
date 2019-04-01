import { Reducer } from 'redux';
import { ADD_RECIPE, ALL_USER_RECIPES, EDIT_RECIPE, REMOVE_RECIPE, SINGLE_RECIPE } from '../constants/recipe';
import { RecipeActions } from '../actions/types/recipe';
import { IUser } from './user';

export interface IRecipe {
	owner: IUser;
	recipe_name: string;
	created: Date;
	updated: Date;
	ingredients: Array<string>;
}

interface IRecipeState {
    all_user_recipes: Array<IRecipe>;
    single_recipe: IRecipe | null;
    add_recipe_success: boolean;
    all_recipes_loading: boolean;
    all_recipes_err: string;
    single_recipe_loading: boolean;
    single_recipe_err: string;
    edit_recipe_loading: boolean;
    edit_recipe_success: boolean;
    edit_recipe_err: string;
    remove_recipe_success: boolean;
    remove_recipe_err: string;
    add_recipe_pending: boolean;
    add_recipe_err: string;
}

const initialState: IRecipeState = {
    all_user_recipes: [],
    single_recipe: null,
    add_recipe_success: false,
    all_recipes_loading: false,
    all_recipes_err: '',
    single_recipe_loading: false,
    single_recipe_err: '',
    edit_recipe_err: '',
    edit_recipe_loading: false,
    edit_recipe_success: false,
    remove_recipe_err: '',
    remove_recipe_success: false,
    add_recipe_err: '',
    add_recipe_pending: false
};

export const recipeReducer: Reducer<IRecipeState, RecipeActions> = (state = initialState, action) => {
    switch (action.type) {
        case ALL_USER_RECIPES:
            return {
                ...state,
                all_user_recipes: action.allRecipes,
                all_recipes_loading: false
            }
        case ADD_RECIPE:
            return {
                ...state,
                all_user_recipes: [...state.all_user_recipes, action.newRecipe],
                add_recipe_success: true,
                add_recipe_pending: false
            }
        case EDIT_RECIPE:
            return {
                ...state,
                edit_recipe_success: true,
                edit_recipe_loading: false
            }
        case REMOVE_RECIPE:
            return {
                ...state,
                remove_recipe_success: true,
                remove_recipe_err: ''
            }
        case SINGLE_RECIPE:
            return {
                ...state,
                single_recipe: action.recipe,
                single_recipe_loading: false
            }
        default:
            return state
    };
};