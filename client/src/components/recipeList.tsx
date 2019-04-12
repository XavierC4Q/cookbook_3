import * as React from 'react';
import { IRecipe } from '../store/reducers/recipe';
import { IUser } from '../store/reducers/user';

import Recipe from './recipe';

export interface IRecipeListProps {
	recipes: IRecipe[];
	currentUser: IUser | null;
	profileOwner: IUser | null;
}

const RecipeList: React.FC<IRecipeListProps> = (props: IRecipeListProps) => {
	const [ selectedRecipe, setRecipe ] = React.useState({});
	const [ modalOpen, handleModal ] = React.useState(false);

	const toggleModal = () => handleModal(!modalOpen);

	const setRecipeDetail = (id: number) => {
		const findRecipe = props.recipes.find((recipe) => recipe.id === id);
		setRecipe({...selectedRecipe, ...findRecipe});
	};

	const renderRecipes = (recipes: IRecipe[]): React.ReactNodeArray => {
		return recipes.map((recipe, i) => <Recipe key={i} toggleRecipeDetail={setRecipeDetail} {...recipe} />);
	};

	return <div className='recipe-list'>{renderRecipes(props.recipes)}</div>;
};

export default RecipeList;
