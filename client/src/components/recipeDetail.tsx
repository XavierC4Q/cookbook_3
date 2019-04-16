import * as React from 'react';
import { IRecipe } from '../store/reducers/recipe';
import { IUser } from '../store/reducers/user';

interface IRecipeDetailProps extends IRecipe {
	currentUser: IUser | null;
	profileOwner: IUser | null;
	closeRecipeDetail: () => void;
}

const RecipeDetail: React.FC<IRecipeDetailProps> = (props: IRecipeDetailProps) => {
	return (
		<div>
			<section className='recipe-detail-header-section'>
				<h2>{props.recipe_name}</h2>
				<span onClick={props.closeRecipeDetail}>X</span>
			</section>
			<section className='recipe-detail-image-section'>
				<img src={props.image || ''} alt='recipe image' />
			</section>
			<section className='recipe-detail-content'>
				<div>
					<span>Favorites: {props.favorite_count}</span>
				</div>
				<div>{props.description}</div>
				<div>
					<h4>Ingredients</h4>
					{props.ingredients.map((ingred, i) => <p key={i}>{ingred}</p>)}
				</div>
			</section>
		</div>
	);
};

export default RecipeDetail;
