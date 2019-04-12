import * as React from 'react';
import { IRecipe } from '../store/reducers/recipe';

interface IRecipeViewProps extends IRecipe {
	toggleRecipeDetail: (id: number) => void;
}

const Recipe: React.FC<IRecipeViewProps> = (props: IRecipeViewProps) => {

	return (
		<div className='recipe-cont' onClick={() => props.toggleRecipeDetail(props.id)}>
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
