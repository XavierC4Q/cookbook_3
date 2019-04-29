import * as React from 'react';
import { IRecipe } from '../../store/reducers/recipe';
import { EditRecipeProps } from '../containers/editRecipeContainer';
import { IFormValues } from './formFields';
import { RecipeForm } from './recipeForm';

const EditRecipeForm: React.FC<EditRecipeProps> = (props: EditRecipeProps) => {
	const {
		currentUser,
		singleRecipe,
		recipeId,
		recipeEdit,
		profileOwner,
		editLoading,
		editSuccess,
		editRecipeErr,
		singleRecipeErr,
		singleRecipeLoading,
		getSingleRecipe,
	} = props;

	const [ editMessage, setEditMessage ] = React.useState('');

	React.useEffect(
		() => {
			if (currentUser && profileOwner && currentUser.id !== profileOwner.id) {
				props.history.push('/');
			}
			setEditMessage('');
			getSingleRecipe(recipeId);
		},
		[],
	);

	const initialFormValues: IFormValues = {
		recipe_name:
			singleRecipe ? singleRecipe.recipe_name :
			'',
		description:
			singleRecipe ? singleRecipe.description :
			'',
		ingredients:
			// Single recipe is found and there are ingredients present

				singleRecipe && singleRecipe.ingredients.length > 0 ? singleRecipe.ingredients :
				[],
	};

	const handleSubmit = (updatedRecipe: Partial<IRecipe>) => {
		// NOT QUITE WORKING AS EXPECTED. CHECK EDIT VALUES
		 Promise.resolve(recipeEdit(recipeId, updatedRecipe))
		 .then(() => {
			 if (editSuccess) {
				 setEditMessage('Recipe Edited Successfully');
				 setTimeout(() => {
					 props.resetRecipeEdit();
					 props.history.push(`/profile/${profileOwner && profileOwner.id}`);
				 }, 800);
			 } else {
				 setEditMessage('Failed to properly edit recipe');
			 }
		 }).catch((err) => {
			 console.log('Something terrible happened in edit recipe');
		 });
	};
	return (
		<div>
			<h1>Edit Recipe Form</h1>
			<RecipeForm
				initialValues={initialFormValues}
				onSubmit={handleSubmit}
				message={editMessage}
				recipeId={recipeId}
			/>
		</div>
	);
};

export default EditRecipeForm;
