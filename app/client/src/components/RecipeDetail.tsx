import * as React from 'react';
import { Link } from 'react-router-dom';
import { IRecipe } from '../store/recipe/types';
import { IUser } from '../store/auth/types';

interface IRecipeDetail {
	recipe: IRecipe | null;
	currentUser: IUser | null;
	owner: IUser | null;
	closeDetail: () => void;
}

const recipeEditLink = (currentUser: IUser, owner: IUser, id: number): JSX.Element | null => {
	if (currentUser.id === owner.id) {
		const recipeEditUrl = `/recipe/edit/${id}`;
		return (
			<span>
				<Link to={recipeEditUrl}>Edit Recipe</Link>
			</span>
		);
	}
	return null;
};

const RecipeDetail: React.FC<IRecipeDetail> = (props) => {
	if (!props.recipe) {
		return null;
	}

	return (
		<div>
			<section>
				<div>
					<h2>{props.recipe.recipe_name}</h2>
					<span onClick={props.closeDetail}>X</span>
				</div>
				<div>
					<span>
						By:{' '}
						{
							props.owner ? props.owner.username :
							''}
					</span>
				</div>
			</section>

			<section>
				<img src={props.recipe.image || ''} alt='recipe' />
			</section>

			<section>
				<div>
					<div>
						<span>
							{props.currentUser &&
								props.owner &&
								recipeEditLink(props.currentUser, props.owner, props.recipe.id)}
						</span>
						<span>Favorites: {props.recipe.favorite_count}</span>
						<span>Forks: 0</span>
					</div>
				</div>
				<div>
					<div>
						<h4>Ingredients</h4>
						{props.recipe.ingredients &&
							(props.recipe.ingredients as string[]).map((ingred, i) => <p key={i}>{ingred}</p>)}
					</div>
					<div>
						<p>{props.recipe.description}</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default RecipeDetail;
