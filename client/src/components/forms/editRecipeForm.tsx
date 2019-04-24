import * as React from 'react';
import * as Yup from 'yup';
import { EditRecipeProps } from '../containers/editRecipeContainer';
import { IFormState } from '../hooks/useForm';
import useFormHook from '../hooks/useForm';
import { Field } from './formFields';

interface IEditFormState {
	recipe_name: string;
	image: File | null;
	description: string;
	ingredients: string[];
}

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

const initialState: IEditFormState = {
	recipe_name: '',
	description: '',
	ingredients: [],
	image: null,
};

const EditRecipeForm: React.FC<EditRecipeProps> = (props: EditRecipeProps) => {
	const FormState: IFormState = useFormHook(initialState);

	const [ ingredientCount, setIngredients ] = React.useState(1);

	const addIngredient = () => setIngredients(ingredientCount + 1);

	const removeIngredient = () => setIngredients(ingredientCount - 1);

	return (
		<div>
			<h2>Edit Your Recipe</h2>
			<form>
				<Field
					type='text'
					label='New Recipe Name'
					name='recipe_name'
					value={FormState.inputs.recipe_name}
					onChange={FormState.handleInput}
					errors={FormState.errors.recipe_name}
					placeholder={

							props.singleRecipe ? props.singleRecipe.recipe_name :
							''
					}
				/>
				<Field
					type='text'
					label='New Recipe Description'
					name='description'
					value={FormState.inputs.recipe_name}
					onChange={FormState.handleInput}
					errors={FormState.errors.recipe_name}
					placeholder={

							props.singleRecipe ? props.singleRecipe.description :
							''
					}
				/>
			</form>
		</div>
	);
};

export default EditRecipeForm;
