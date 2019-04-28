import { Field, FieldArray, FieldArrayRenderProps, FieldProps, Form, Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { IFormValues, Input } from './formFields';

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

export interface IRecipeForm {
	initialValues: IFormValues;
	onSubmit: () => void;
}

export const RecipeForm: React.FC<IRecipeForm> = (props: IRecipeForm) => (
	<React.Fragment>
		<Formik
			initialValues={{...props.initialValues}}
			validationSchema={validate}
			onSubmit={(values: IFormValues, actions: FormikActions<IFormValues>) => null}
			render={({ errors, values, ...actions }: FormikProps<IFormValues>) => {

				const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
					e.preventDefault();
					try {
						await actions.validateForm(values);
						console.log('VALID SUBMISSION');
						actions.resetForm();
						actions.submitForm();

					} catch (err) {
						console.log('INVALID FORM');
						console.log(errors);
					}
				};
				return (
					<div>
						<form onSubmit={formSubmit}>
							<Field
								name='recipe_name'
								render={({ field, form }: FieldProps<IFormValues>) => {
									return (
										<Input
											field={field}
											form={form}
											label='Recipe Name'
											placeholder='Enter New Recipe Name'
										/>
									);
								}}
							/>
							<Field
								name='description'
								render={({ field, form }: FieldProps<IFormValues>) => {
									return (
										<Input
											field={field}
											form={form}
											label='Recipe Description'
											placeholder='Enter New Recipe Description'
										/>
									);
								}}
							/>
							<FieldArray
								name='ingredients'
								render={(arrayHelpers: FieldArrayRenderProps) =>

										values.ingredients &&
										values.ingredients.length ? values.ingredients.map((ingred, index) => (
											<div key={index}>
												<Field
													name={`ingredients.${index}`}
													render={({ field, form }: FieldProps<IFormValues>) => {
														return (
															<React.Fragment>
																<Input
																	field={field}
																	form={form}
																	label={`Ingredient #${index + 1}`}
																	placeholder={ingred}
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
												<button type='button' onClick={() => arrayHelpers.insert(index, '')}>
													More Ingredients
												</button>
											</div>
										)) :
										<button onClick={() => arrayHelpers.push('')}>Add Ingredient</button>}
							/>
							<div>
								<button type='submit'>Submit</button>
							</div>
						</form>
					</div>
				);
			}}
		/>
	</React.Fragment>
);
