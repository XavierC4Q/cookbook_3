import * as React from 'react';
import { Form, Formik, Field, FieldArray, FieldArrayRenderProps, FormikActions } from 'formik';
import { IRecipeFormValues } from '../store/recipe/types';
import { showErrors, recipeValidate, FieldInput } from './formUtil';
import { FormikProps } from 'formik';

interface IRecipeForm {
	initVals?: IRecipeFormValues;
    handleSubmit: (data: FormData) => void;
    message: string;
}

const RecipeForm: React.FC<IRecipeForm> = (props) => {
	const { initVals, handleSubmit } = props;
	return (
		<div>
			<Formik
				initialValues={
					initVals || {
						recipe_name: '',
						description: '',
						ingredients: [],
						image: '',
					}
				}
				validationSchema={recipeValidate}
				enableReinitialize
				onSubmit={(values: IRecipeFormValues, actions: FormikActions<IRecipeFormValues>) => {
                    const formData = new FormData();
					if (values.image) {
						formData.append('image', values.image);
					}
					formData.append('recipe_name', values.recipe_name);
					formData.append('description', values.description);
					formData.append('ingredients', JSON.stringify(values.ingredients));
					handleSubmit(formData);
                }}
				render={({ errors, values, ...actions }: FormikProps<IRecipeFormValues>) => {
					return (
						<Form>
							<Field name='recipe_name' component={FieldInput} label='Recipe Name' />
							<Field name='description' component={FieldInput} label='Recipe Description' />
							<section>
								<div>
									<label>Recipe Image</label>
								</div>
								<div>
									<input
										type='file'
										accept='image/*'
										onChange={(e) => {
											actions.setFieldValue(
												'image',

													e.currentTarget.files ? e.currentTarget.files[0] :
													'',
											);
										}}
									/>
								</div>
							</section>
							<FieldArray
								name='ingredients'
								render={(arrayHelpers: FieldArrayRenderProps) => (
									<div>
										{values.ingredients &&
											(values.ingredients as string[]).map((_, index) => (
												<div key={index}>
													<Field
														name={`ingredients[${index}]`}
														component={FieldInput}
														label={`Ingredient #${index + 1}`}
													/>
													<button type='button' onClick={() => arrayHelpers.remove(index)}>
														Remove This Ingredient
													</button>
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
                            <div>{props.message}</div>
							<div>{showErrors(errors)}</div>
						</Form>
					);
				}}
			/>
		</div>
	);
};

export default RecipeForm;
