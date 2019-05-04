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
	} = props;

	const [ editMessage, setEditMessage ] = React.useState('');

	React.useEffect(
		() => {
			setEditMessage('');
		},
		[],
	);

	const handleSubmit = (updatedRecipe: Partial<IRecipe>) => {
		Promise.resolve(props.recipeEdit(recipeId, updatedRecipe))
			.then(() => {
				console.log('DONE?');
			});
	};
	console.log('SINGLE RECIPE', singleRecipe);
	return (
		<div>
			<h1>Edit Recipe Form</h1>
			<RecipeForm
				initialValues={singleRecipe}
				onSubmit={handleSubmit}
				message={editMessage}
			/>
		</div>
	);
};

export default EditRecipeForm;
