import * as React from 'react';
import { IRecipe } from '../store/reducers/recipe';
import { IUser } from '../store/reducers/user';

interface IRecipeDetailProps extends IRecipe {
	currentUser: IUser | null;
	profileOwner: IUser | null;
}

const RecipeDetail: React.FC<IRecipeDetailProps> = (props: IRecipeDetailProps) => {
	return (
		<div>
			<section className='recipe-detail-header-section'>
				<h2>{props.recipe_name}</h2>
				<span>X</span>
			</section>
			<section className='recipe-detail-image-section'>
				<img src={props.image || ''} alt='recipe image' />
			</section>
			<section className='recipe-detail-content' />
		</div>
	);
};

export default RecipeDetail;
