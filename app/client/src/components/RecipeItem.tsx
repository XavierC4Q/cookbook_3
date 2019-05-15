import * as React from 'react';
import { IRecipe } from '../store/recipe/types';

interface IOwnProps {
	recipe: IRecipe;
	setRecipeDetail: (id: number) => void;
}

const RecipeItem: React.FC<IOwnProps> = (props) => {
	return (
		<div onClick={() => props.setRecipeDetail(props.recipe.id)}>
			<section className='recipe-header'>
				<div className='recipe-name'>
					<h2>{props.recipe.recipe_name}</h2>
				</div>
				<div className='recipe-owner'>
					<h3>By {props.recipe.owner.username}</h3>
				</div>
			</section>

			<section className='recipe-image'>
				<img src={props.recipe.image || ''} alt='recipe img' />
			</section>

			<section className='recipe-content'>
				<div>
					<label>Favorites</label>
					<p>{props.recipe.favorite_count}</p>
				</div>
			</section>
		</div>
	);
};

export default RecipeItem;
