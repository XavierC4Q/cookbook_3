import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IRecipe } from '../../store/reducers/recipe';
import { IUser } from '../../store/reducers/user';
import RecipeList from '../recipe/recipeList';

export interface IUserRecipesProps extends RouteComponentProps {
	currentUser: IUser | null;
	profileOwner: IUser | null;
	recipes: IRecipe[];
}

const RecipeHeader = (currentUser: IUser | null, profileOwner: IUser | null): React.ReactNode => {
	if (!profileOwner) {
		return <h1>NOT FOUND</h1>;
	}
	if (currentUser && currentUser.id === profileOwner.id) {
		return <h1>Your Recipes</h1>;
	}
	return <h1>{profileOwner.username}'s Recipes</h1>;
};

const UserRecipes: React.FC<IUserRecipesProps> = (props: IUserRecipesProps) => {
	return (
		<div className='recipe-list-cont'>
			{RecipeHeader(props.currentUser, props.profileOwner)}
			<RecipeList recipes={props.recipes} currentUser={props.currentUser} profileOwner={props.profileOwner} />
		</div>
	);
};

export default UserRecipes;
