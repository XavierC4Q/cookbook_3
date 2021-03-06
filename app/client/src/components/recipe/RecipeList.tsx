import * as React from 'react';
import { IRecipe } from '../../store/recipe/types';
import { IUser } from '../../store/auth/types';

import RecipeDetail from './RecipeDetail';
import RecipeItem from './RecipeItem';


interface IOwnProps {
	recipes: IRecipe[];
	currentUser: IUser | null;
	owner: IUser | null;
	title: string;
	getRecipes: (id: string) => void;
}

const RecipeList: React.FC<IOwnProps> = (props) => {
    const { getRecipes, currentUser, owner } = props;
	React.useEffect(
		() => {
			if (owner) {
				getRecipes(owner.id.toString());
			}
		},
		[ props.currentUser, props.owner ],
	);

	const [ selectedRecipe, selectRecipe ] = React.useState<IRecipe | null>(null);

	const handleTitle = (): string => {
        if (currentUser && owner && currentUser.id === owner.id) return 'Your';
        return 'Their';
    };

	const setRecipeDetail = (id: number) => {
		const findRecipe = props.recipes.find((r) => r.id === id);
		if (findRecipe) {
			selectRecipe({ ...selectedRecipe, ...findRecipe });
		}
	};

	const clearRecipeDetail = () => {
		selectRecipe(null);
	};

	if (selectedRecipe) {
		return (
			<RecipeDetail
				recipe={selectedRecipe}
				currentUser={props.currentUser}
				owner={props.owner}
				closeDetail={clearRecipeDetail}
			/>
		);
	}

	return (
		<div>
			<h2>{`${handleTitle()} ${props.title}`}</h2>
			{props.recipes.map((recipe, index) => {
				return <RecipeItem key={index} recipe={recipe} setRecipeDetail={setRecipeDetail} />;
			})}
		</div>
	);
};

export default RecipeList;
