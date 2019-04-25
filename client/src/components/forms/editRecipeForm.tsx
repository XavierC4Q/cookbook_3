import { Field, FieldArray, Form, Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { EditRecipeProps } from '../containers/editRecipeContainer';

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = [ 'image/jpg', 'image/jpeg', 'image/gif', 'image/png' ];

const validate: Yup.Schema<object> = Yup.object().shape({
	recipe_name: Yup.string()
		.min(10, 'recipe_name: Recipe name must be at least 10 characters')
		.max(50, 'recipe_name: Recipe name cannot exceed 50 characters'),
	description: Yup.string(),
	image: Yup.mixed()
		.test('fileSize', 'image: Image file too large', (value) => value && value.size <= FILE_SIZE)
		.test('fileFormat', 'image: Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
	ingredients: Yup.array().of(
		Yup.string()
			.min(4, 'ingredients: Ingredient must be longer than 4 characters')
			.max(100, 'ingredients: Ingredient cannot exceed 100 characters'),
	),
});

interface IFormValues {
	recipe_name: string;
	description: string;
	ingredients: string[];
	image: File | null;
}

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
	return (
		<div>
			<h1>Edit Recipe Form</h1>
			<Formik
				initialValues={initialFormValues}
				validationSchema={validate}
				onSubmit={(values: IFormValues, { setSubmitting, submitForm }: FormikActions<IFormValues>) => {
					console.log('wepa');
				}}
				render={({ errors, values, handleSubmit, handleReset }: FormikProps<IFormValues>) => {
					return <div>
						<Form>

						</Form>
					</div>;
				}}
			/>
		</div>
	);
};

export default EditRecipeForm;
