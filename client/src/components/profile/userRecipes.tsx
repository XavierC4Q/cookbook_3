import * as React from 'react';
import { IUser } from '../../store/reducers/user';
import { IRecipe } from '../../store/reducers/recipe';
import RecipeList from '../recipeList';
import { RouteComponentProps } from 'react-router';

export interface IUserRecipesProps extends RouteComponentProps {
    id: string;
	currentUser: IUser | null;
	profileOwner: IUser | null;
	recipes: Array<IRecipe>;
	getProfileOwner: (id: string) => void;
	getRecipes: (userId: string) => void;
}

const UserRecipes: React.FC<IUserRecipesProps> = (props: IUserRecipesProps) => {
    React.useEffect(() => {
        props.getProfileOwner(props.id);
        props.getRecipes(props.id);
    }, [ props.id ]);
	return (
        <div>
			<RecipeList recipes={props.recipes} currentUser={props.currentUser} profileOwner={props.profileOwner} />
		</div>
	);
};

export default UserRecipes;
