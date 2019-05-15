import * as React from 'react';
import * as Yup from 'yup';
import { ICredentials, INewUserCredentials } from '../store/auth/types';
import { IRecipeFormValues } from '../store/recipe/types';
import { FormikErrors, FieldProps } from 'formik';

export const showErrors = (errors: FormikErrors<INewUserCredentials | ICredentials | IRecipeFormValues>) =>
	Object.values(errors).map((err, i) => <p key={i}>{err}</p>);

export const loginValidate: Yup.Schema<object> = Yup.object().shape({
	username: Yup.string().required('Username is Required!'),
	password: Yup.string().required('Password is Required!'),
});

export const signupValidate: Yup.Schema<object> = Yup.object().shape({
	username: Yup.string()
		.min(7, 'Username must be at least 7 characters')
		.max(21, 'Username cannot be longer than 21 characters')
		.required('Username is Required'),
	password1: Yup.string()
		.min(8, 'Password must be at least 8 characters')
		.max(21, 'Password cannot be longer than 21 characters')
		.required(),
	password2: Yup.string()
		.oneOf([ Yup.ref('password1'), null ], 'Passwords must match')
		.required('Confirm password is required'),
	email: Yup.string().email('Email address is not valid'),
	country: Yup.string().required('Country is required'),
});

export const recipeValidate: Yup.Schema<object> = Yup.object().shape({
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

export const FieldInput = ({ field, label }: FieldProps<IRecipeFormValues | INewUserCredentials | ICredentials> & { label: string }) => (
    <section>
        <div>
            <label>{label}</label>
        </div>
        <div>
            <input type='text' {...field}/>
        </div>
    </section>
);
