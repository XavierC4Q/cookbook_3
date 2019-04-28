import * as React from 'react';
import { EditRecipeProps } from '../containers/editRecipeContainer';
import { IFormValues } from './formFields';
import { RecipeForm } from './recipeForm';

const initialFormValues: IFormValues = {
	recipe_name: '',
	description: '',
	ingredients: [],
	image: null,
};

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

	const handleSubmit = () => {
		console.log('SUBMITTEDDDD');
	};
	return (
		<div>
			<h1>Edit Recipe Form</h1>
			<RecipeForm initialValues={initialFormValues} onSubmit={handleSubmit} />
		</div>
	);
};

export default EditRecipeForm;
