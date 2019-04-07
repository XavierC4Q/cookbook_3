import * as React from 'react';
import { IRecipe } from '../store/reducers/recipe';

export interface IRecipeProps extends IRecipe {
	closeModal?: () => void;
}

const renderIngredients = (ingredients: Array<string>): React.ReactNodeArray => {
	return ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>);
};

const Recipe: React.FC<IRecipeProps> = (props: IRecipeProps) => {
	return (
		<div className='recipe-cont'>
			<section className='recipe-header'>
				<h1>{props.recipe_name}</h1>
				<h2>By {props.owner.username}</h2>
				<span onClick={props.closeModal}>x</span>
			</section>
			<section className='recipe-image'>
				<img src={props.image || ''} alt='recipe img' />
			</section>
			<section className='recipe-content'>
				<div>
					<label>Favorites</label>
					<p>{props.favorite_count}</p>
				</div>
				<div>{props.description}</div>
				<div>
					<h3>Ingredients</h3>
					<ul>{renderIngredients(props.ingredients)}</ul>
				</div>
			</section>
		</div>
	);
};

export default Recipe;
