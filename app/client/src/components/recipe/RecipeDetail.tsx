import * as React from 'react';
import { connect } from 'react-redux';
import { IRecipe, IRecipeFavorite } from '../../store/recipe/types';
import { FavoriteRecipeAction, UnFavoriteRecipeAction } from '../../store/recipe/actions';
import { IUser } from '../../store/auth/types';
import axios from 'axios';
import { Dispatch } from 'typesafe-actions';
import { recipeEditLink } from '../util/recipe';

interface IRecipeDetailProps {
	recipe: IRecipe | null;
	currentUser: IUser | null;
	owner: IUser | null;
	closeDetail: () => void;
}

const dispatchProps = (dispatch: Dispatch) => ({
	favorite: (favorited_by: IUser, recipe: IRecipe) => dispatch(FavoriteRecipeAction(favorited_by, recipe)),
	unfavorite: (id: number) => dispatch(UnFavoriteRecipeAction(id)),
});

const RecipeDetail: React.FC<IRecipeDetailProps & ReturnType<typeof dispatchProps>> = (props) => {
	const [ detailRecipe, setDetailRecipe ] = React.useState<IRecipeFavorite | null>(null);

	React.useEffect(() => {
		if (props.currentUser && props.recipe) {
			Promise.resolve(
				axios.get('/cookbook/favorite/single_favorite/', {
					params: {
						user: props.currentUser.id,
						recipe: props.recipe.id,
					},
				}),
			)
				.then((data) => {
					if (data.data.length) {
						setDetailRecipe(data.data[0]);
					}
				})
				.catch((err) => {
					console.log('FAILED TO GET FAVORITE', err);
				});
		}
	}, [ props.favorite, props.unfavorite ]);

	const handleFavoriteButton = () => {
		if (props.currentUser && props.owner) {
			if (!detailRecipe && props.currentUser.id !== props.owner.id) {
				return (
					<button
						type='button'
						onClick={() => props.favorite(props.currentUser as IUser, props.recipe as IRecipe)}
					>
						Favorite Recipe
					</button>
				);
			}
			if (detailRecipe && props.currentUser.id !== props.owner.id) {
				return (
					<button
						type='button'
						onClick={() => props.unfavorite((detailRecipe as IRecipeFavorite).id)}
					>
						Unfavorite Recipe
					</button>
				);
			}
		}
		return null;
	};

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
						{handleFavoriteButton()}
					</div>
				</div>
				<div>
					<div>
						<h4>Ingredients</h4>
						{props.recipe &&
							props.recipe.ingredients.length > 0 &&
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

export default connect(null, dispatchProps)(RecipeDetail);
