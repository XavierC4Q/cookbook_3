import * as React from 'react';
import { IRecipe } from '../store/reducers/recipe';

export interface IRecipeProps extends IRecipe {
	closeModal?: () => void;
}

const renderIngredients = (ingredients: Array<string>): React.ReactNodeArray => {
	return ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>);
};

const Recipe: React.FC<IRecipeProps> = (props: IRecipeProps) => {
	
	const handleRecipeDetail = () => {
		console.log('Div clicked')
	};

	return (
		<div className='recipe-cont' onClick={handleRecipeDetail}>
			<section className='recipe-header'>
				<div className='recipe-name'>
					<h2>{props.recipe_name}</h2>
				</div>
				<div className='recipe-owner'>
					<h3>By {props.owner.username}</h3>
				</div>
			</section>
			<section className='recipe-image'>
				<img src={props.image || ''} alt='recipe img' />
			</section>
			<section className='recipe-content'>
				<div>
					<label>Favorites</label>
					<p>{props.favorite_count}</p>
				</div>
			</section>
		</div>
	);
};

export default Recipe;
