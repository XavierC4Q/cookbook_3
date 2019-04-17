import * as React from 'react';
import { Link } from 'react-router-dom';
import { IRecipe } from '../store/reducers/recipe';
import { IUser } from '../store/reducers/user';

interface IRecipeDetailProps extends IRecipe {
	currentUser: IUser | null;
	profileOwner: IUser | null;
	closeRecipeDetail: () => void;
}

const RecipeDetail: React.FC<IRecipeDetailProps> = (props: IRecipeDetailProps) => {
	const handleEditLink = (): JSX.Element | null => {
		if (props.currentUser && props.profileOwner) {
			if (props.currentUser.pk === props.profileOwner.id) {
				return( <span>
				<Link to='/edit'>Edit Recipe</Link>
			</span>);
			}
			return null;
		}
		return null;
	};
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
					<div>{handleEditLink()}</div>
					<div>
						<span>Favorites: {props.favorite_count}</span>
					</div>
				</div>
				<div>
					<h4>Description</h4>
					<p>{props.description}</p>
				</div>
				<div>
					<h4>Ingredients</h4>
					{props.ingredients.map((ingred, i) => <p key={i}>{ingred}</p>)}
				</div>
			</section>
		</div>
	);
};

export default RecipeDetail;
