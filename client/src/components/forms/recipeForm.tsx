import { Field, FieldArray, FieldArrayRenderProps, FieldProps, Form, Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { IRecipe } from '../../store/reducers/recipe';
import { IFormValues, Input } from './formFields';

const validate: Yup.Schema<object> = Yup.object().shape({
	recipe_name: Yup.string()
		.min(10, 'recipe_name: Recipe name must be at least 10 characters')
		.max(50, 'recipe_name: Recipe name cannot exceed 50 characters'),
	description: Yup.string(),
	ingredients: Yup.array().of(
		Yup.string()
			.min(4, 'ingredients: Ingredient must be longer than 4 characters')
			.max(100, 'ingredients: Ingredient cannot exceed 100 characters'),
	),
});

export interface IRecipeForm {
	initialValues: IFormValues;
	onSubmit: (updatedRecipe: Partial<IRecipe>) => void;
	message: string;
	recipeId: string;
}

export const RecipeForm: React.FC<IRecipeForm> = (props: IRecipeForm) => (
	<React.Fragment>
		<Formik
			initialValues={{...props.initialValues}}
			validationSchema={validate}
			onSubmit={(values: IFormValues, actions: FormikActions<IFormValues>) => {
				props.onSubmit(values);
			}}
			render={({ errors, values, ...actions }: FormikProps<IFormValues>) => {
				const showErrors = () => {
					if (Object.keys(errors).length) {
						return Object.values(errors).map((err) => (
							<p>{err}</p>
						));
					}
					return null;
				};
				return (
					<div>
						<Form>
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
										values.ingredients.length > 0 ? values.ingredients.map((ingred, index) => (
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
													{/** ADD INGREDIENTS BUTTON NEEDS TO BE MOVED SOMEHOW */}
												</button>
											</div>
										)) :
										<button onClick={() => arrayHelpers.push('')}>Add Ingredient</button>}
							/>
							<div>
								<button type='submit'>Submit</button>
							</div>
							<div>
								{props.message}
								{showErrors()}
							</div>
						</Form>
					</div>
				);
			}}
		/>
	</React.Fragment>
);
