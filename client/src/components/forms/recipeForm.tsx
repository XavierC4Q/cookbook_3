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

const validate: Yup.Schema<object> = Yup.object().shape({
	recipe_name: Yup.string()
		.min(10, 'Recipe name must be at least 10 characters')
		.max(50, 'Recipe name cannot exceed 50 characters'),
	description: Yup.string().max(500, 'Description cannot exceed 500 characters'),
	ingredients: Yup.array().of(
		Yup.string()
			.min(4, 'Ingredient must be longer than 4 characters')
			.max(100, 'Ingredient cannot exceed 100 characters'),
	),
});

export interface IRecipeForm {
	initialValues?: IRecipe | null;
	onSubmit: (updatedRecipe: Partial<IRecipe>) => void;
	message: string;
}

const showErrors = (errors: FormikErrors<IFormValues>) => {
	if (Object.keys(errors).length) {
		return Object.values(errors).map((err) => <p>{err}</p>);
	}
	return null;
};

export const RecipeForm: React.FC<IRecipeForm> = (props: IRecipeForm) => {
	const [ initValues, setInitValues ] = React.useState<IFormValues>({
		recipe_name: '',
		description: '',
		ingredients: [],
	});

	React.useEffect(
		(): void => {
			if (props.initialValues) {
				setInitValues({
					...initValues,
					recipe_name: props.initialValues.recipe_name,
					description: props.initialValues.description,
					ingredients: props.initialValues.ingredients,
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
				enableReinitialize
				render={({ errors, values, ...actions }: FormikProps<IFormValues>) => {
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
										return <Input field={field} label='Recipe Description' />;
									}}
								/>
								<FieldArray
									name='ingredients'
									render={(arrayHelpers: FieldArrayRenderProps) => (
										<div>
											{values.ingredients.map((ingred, index) => (
												<div key={index}>
													<Field
														name={`ingredients[${index}]`}
														render={({ field }: FieldProps<IFormValues>) => {
															console.log('VALUES', values);
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
