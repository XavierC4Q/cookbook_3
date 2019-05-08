import * as React from 'react';
import { Link } from 'react-router-dom';
import { IRecipe } from '../../store/reducers/recipe';
import { IUser } from '../../store/reducers/user';

interface IRecipeDetailProps extends IRecipe {
	currentUser: IUser | null;
	profileOwner: IUser | null;
	closeRecipeDetail: () => void;
}

const RecipeDetail: React.FC<IRecipeDetailProps> = (props: IRecipeDetailProps) => {
	const handleEditLink = (): JSX.Element | null => {
		if (props.currentUser && props.profileOwner) {
			if (props.currentUser.id === props.profileOwner.id) {
				const recipeEditUrl = `/recipe/edit/${props.id}`;
				return (
					<span>
						<Link to={recipeEditUrl}>Edit Recipe</Link>
					</span>
				);
			}
			return null;
		}
		return null;
	};
	console.log(props.ingredients);
	return (
		<div className='recipe-detail-cont'>
			<section className='recipe-detail-header-section'>
				<div className='r-detail-name'>
					<h2>{props.recipe_name}</h2>
					<span onClick={props.closeRecipeDetail}>X</span>
				</div>
				<div className='r-detail-owner'>
					<span>
						By:{' '}
						{
							props.profileOwner ? props.profileOwner.username :
							''}
					</span>
				</div>
			</section>

			<section className='recipe-detail-image-section'>
				<img src={props.image || ''} alt='recipe image' />
			</section>

			<section className='recipe-detail-content'>
				<div className='recipe-stats-links'>
					<div className='recipe-edit'>{handleEditLink()}</div>
					<div className='recipe-stats'>
						<span>Favorites: {props.favorite_count}</span>
						<span>Forks: 0</span>
					</div>
				</div>
				<div className='detail-content'>
					<div className='ingredients-cont'>
						<h4>Ingredients</h4>
						{props.ingredients &&
							(props.ingredients as string[]).map((ingred, i) => (
								<p key={i}>{ingred}</p>
							))}
					</div>
					<div className='description-cont'>
						<p>{props.description}</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default RecipeDetail;
