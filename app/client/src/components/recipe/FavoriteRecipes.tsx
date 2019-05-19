import * as React from 'react';
import { IRecipeFavorite } from '../../store/recipe/types';
import { IUser } from '../../store/auth/types';

import RecipeDetail from './RecipeDetail';
import RecipeItem from './RecipeItem';

interface IOwnProps {
	currentUser: IUser | null;
	owner: IUser | null;
	getFavorites: (id: string) => void;
	recipes: IRecipeFavorite[];
}

const FavoriteRecipes: React.FC<IOwnProps> = (props) => {
	const { getFavorites, currentUser, owner, recipes } = props;
	React.useEffect(
		() => {
			if (owner) {
				getFavorites(owner.id.toString());
			}
		},
		[ currentUser, owner ],
	);

	const [ selectedRecipe, selectRecipe ] = React.useState<IRecipeFavorite | null>(null);
    
    const setRecipeDetail = (id: number) => {
        const findRecipe = props.recipes.find((r) => r.id === id);
        if (findRecipe) {
            selectRecipe({ ...selectedRecipe, ...findRecipe });
        }
    };

    const clearRecipeDetail = () => {
        selectRecipe(null);
    };

	const handleTitle = (): string => {
		if (currentUser && owner && currentUser.id === owner.id) return 'Your';
		return 'Their';
	};


	if (selectedRecipe) {
		return (
			<RecipeDetail
                recipe={selectedRecipe.recipe}
				currentUser={props.currentUser}
				owner={props.owner}
				closeDetail={clearRecipeDetail}
			/>
		);
	}

	return (
		<div>
			<h2>{`${handleTitle()} Favorites`}</h2>
			{props.recipes.map((recipe, index) => {
				return <RecipeItem key={index} recipe={recipe.recipe} setRecipeDetail={setRecipeDetail} />;
			})}
		</div>
	);
};

export default FavoriteRecipes;
