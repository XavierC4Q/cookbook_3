import {
	Field,
	FieldArray,
	FieldArrayRenderProps,
	FieldProps,
	Form,
	Formik,
	FormikActions,
	FormikErrors,
	FormikProps,
} from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { IRecipe } from '../../store/reducers/recipe';
import { IFormValues, Input } from './formFields';

/**
 * @constant validate
 * @description Yup validation schema for a Recipe.
 */
const validate: Yup.Schema<object> = Yup.object().shape({
	recipe_name: Yup.string()
		.min(10, 'Recipe name must be at least 10 characters')
		.max(50, 'Recipe name cannot exceed 50 characters'),
	description: Yup.string().max(500, 'Description cannot exceed 500 characters').nullable(true),
	ingredients: Yup.array().of(
		Yup.string()
			.min(4, 'Ingredient must be longer than 4 characters')
			.max(100, 'Ingredient cannot exceed 100 characters'),
	),
	image: Yup.mixed().nullable(true),
});

/**
 * @interface IRecipeForm
 * @description Interface for the recipe form. Props include an optional set of initial
 * values, in the form of a single Recipe.
 *
 * @property initialValues -- Optional set of initialValues for the form.
 *
 * @property onSubmit -- Function that accepts part of / all the key/value pairs of a single
 * Recipe object. Performs the submit action and following logic from the container.
 *
 * @property message -- String message to display the status of the submission.
 */
export interface IRecipeForm {
	initialValues?: IRecipe | null;
	onSubmit: (recipe: Partial<IRecipe>) => void;
	message: string;
}

/**
 * @constant showErrors
 * @param errors Array of formik errors for the recipe form.
 * @description Helper that takes an array of Formik errors and maps the individual
 * errors to p tags.
 */
const showErrors = (errors: FormikErrors<IFormValues>) => Object.values(errors).map((err) => <p>{err}</p>);

/**
 * @constant RecipeForm
 * @description The RecipeForm functional component. Responsible for the rendering of
 * recipe fields to be edited/added as well as the submission of the recipe data.
 * @param props : Props of type IRecipeForm
 *
 */
export const RecipeForm: React.FC<IRecipeForm> = (props: IRecipeForm) => {
	const [ initValues, setInitValues ] = React.useState<IFormValues>({
		recipe_name: '',
		description: '',
		ingredients: [],
		image: null,
	});

	/**
	 * Effect for setting the initial values of the form. The original values will
	 * update when the single recipe is done fetching.
	 */
	React.useEffect(
		(): void => {
			if (props.initialValues) {
				setInitValues({
					...initValues,
					recipe_name: props.initialValues.recipe_name,
					description: props.initialValues.description,
					ingredients: props.initialValues.ingredients,
					image: props.initialValues.image,
				});
			}
		},
		[ props.initialValues ],
	);

	return (
		<React.Fragment>
			<Formik
				initialValues={{ ...initValues }}
				validationSchema={validate}
				onSubmit={(values: IFormValues, actions: FormikActions<IFormValues>) => {
					props.onSubmit(values);
				}}
				enableReinitialize // Needed to update initialValues properly
				render={({ errors, values, ...actions }: FormikProps<IFormValues>) => {
					console.log('FORMIK VALUES', values);
					return (
						<div>
							<Form>
								<Field
									name='recipe_name'
									render={({ field }: FieldProps<IFormValues>) => {
										return <Input field={field} label='Recipe Name' />;
									}}
								/>
								<Field
									name='description'
									render={({ field }: FieldProps<IFormValues>) => {
										return (
											<Input
												field={{ ...field, value: values.description || '' }}
												label='Recipe Description'
											/>
										);
									}}
								/>
								{/** Field for image uploads. Will be updated to properly handle files */}
								<Field
									name='image'
									render={({ field }: FieldProps<IFormValues>) => {
										return <input {...field} type='file' name='image' />;
									}}
								/>
								<FieldArray
									name='ingredients'
									render={(arrayHelpers: FieldArrayRenderProps) => (
										<div>
											{values.ingredients.map((_, index) => (
												<div key={index}>
													<Field
														name={`ingredients[${index}]`}
														render={({ field }: FieldProps<IFormValues>) => {
															return (
																<React.Fragment>
																	<Input
																		field={field}
																		label={`Ingredient #${index + 1}`}
																	/>
																	<button
																		type='button'
																		onClick={() => arrayHelpers.remove(index)}
																	>
																		Remove This Ingredient
																	</button>
																</React.Fragment>
															);
														}}
													/>
												</div>
											))}
											<button type='button' onClick={() => arrayHelpers.push('')}>
												Add Ingredient
											</button>
										</div>
									)}
								/>
								<div>
									<button type='submit'>Submit</button>
								</div>
								<div>
									{props.message}
									{showErrors(errors)}
								</div>
							</Form>
						</div>
					);
				}}
			/>
		</React.Fragment>
	);
};
