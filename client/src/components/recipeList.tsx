import * as React from 'react';
import { IRecipe } from '../store/reducers/recipe';
import { IUser } from '../store/reducers/user';

import Recipe from './recipe';

export interface IRecipeListProps {
    recipes: Array<IRecipe>;
    currentUser: IUser | null;
    profileOwner: IUser | null;
}

const renderRecipes = (recipes: Array<IRecipe>): React.ReactNodeArray => {
    return recipes.map((recipe, i) => (<Recipe key={i}{...recipe}/>))
};
 
const RecipeList: React.FC<IRecipeListProps> = (props: IRecipeListProps) => {
    return (<div className='recipe-list'>
            {renderRecipes(props.recipes)}
        </div>);
}
 
export default RecipeList;