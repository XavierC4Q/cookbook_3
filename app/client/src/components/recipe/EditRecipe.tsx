import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { RootState, Dispatch } from 'typesafe-actions';
import { EditRecipeAction, GetSingleRecipeAction } from '../../store/recipe/actions';
import { INewRecipe } from '../../store/recipe/types';

import RecipeForm from './RecipeForm';

const stateProps = (state: RootState) => ({
	recipe: state.recipes.singleRecipe,
	recipeLoading: state.recipes.singleRecipeLoading,
	recipeErr: state.recipes.singleRecipeError,
	currentUser: state.auth.currentUser,
	owner: state.users.singleUser,
});

const dispatchProps = (dispatch: Dispatch) => ({
	editRecipe: (data: INewRecipe) => dispatch(EditRecipeAction(data)),
	getSingleRecipe: (id: string) => dispatch(GetSingleRecipeAction(id)),
});

type Props = ReturnType<typeof stateProps> & ReturnType<typeof dispatchProps> & { id: string };

const EditRecipe: React.FC<Props & RouteComponentProps> = (props) => {
	const { editRecipe, getSingleRecipe, currentUser, owner, recipe } = props;

	const [ editMessage, setEditMessage ] = React.useState('');

	React.useEffect(
		() => {
			getSingleRecipe(props.id);
			setEditMessage('');
		},
		[ props.id ],
	);

	const handleSubmit = (data: FormData) => {
		Promise.resolve(editRecipe({ id: props.id, data }))
			.then(() => {
				setEditMessage('Recipe edited successfully. Redirecting');
				setTimeout(() => {
					props.history.push(`/profile/${owner && owner.id}`);
				}, 1800);
			})
			.catch((err) => {
				setEditMessage('Failed to edit recipe');
			});
	};

	if (currentUser && owner && currentUser.id === owner.id && recipe) {
		return (
			<RecipeForm
				initVals={{
					recipe_name: recipe.recipe_name,
					description: recipe.description,
					ingredients: recipe.ingredients as string[],
					image: '' as string,
				}}
				handleSubmit={handleSubmit}
				message={editMessage}
			/>
		);
	}
	else if (currentUser && owner && currentUser.id !== owner.id && recipe) {
		return <Redirect to='/' />;
	}
	else if (currentUser && owner && currentUser.id === owner.id && !recipe) {
		return <div>Recipe Loading</div>;
	}
	return <Redirect to='/' />;
};

export default connect(stateProps, dispatchProps)(EditRecipe);
