import * as React from 'react';
import { EditRecipeProps } from '../containers/editRecipeContainer';
import { IFormValues } from './formFields';
import { RecipeForm } from './recipeForm';

const EditRecipeForm: React.FC<EditRecipeProps> = (props: EditRecipeProps) => {
	const { singleRecipe, recipeId, profileOwner } = props;

	const [ editMessage, setEditMessage ] = React.useState('');

	React.useEffect(() => {
		setEditMessage('');
	}, []);

	const handleSubmit = (updatedRecipe: FormData) => {
		Promise.resolve(props.recipeEdit(recipeId, updatedRecipe)).then((success: boolean | void) => {
			if (success) {
				setEditMessage('Recipe edited successfully. Redirecting');
				// setTimeout(() => {
				// 	props.resetRecipeEdit();
				// 	props.history.push(`/profile/${profileOwner && profileOwner.id}`);
				// }, 2000);
			} else {
				setEditMessage('Failed to edit successfully');
			}
		});
	};

	return (
		<div>
			<h1>Edit Recipe Form</h1>
			<RecipeForm initialValues={singleRecipe} onSubmit={handleSubmit} message={editMessage} />
		</div>
	);
};

export default EditRecipeForm;
