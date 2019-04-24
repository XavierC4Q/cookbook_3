import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as Yup from 'yup';
import { ISignUpCred } from '../../store/actions/actionCreators/user';
import { IUserAuthContainerProps } from '../containers/userAuthContainer';
import useFormHook, { IFormState } from '../hooks/useForm';
import { Field } from './formFields';

interface ISignUpFormProps extends RouteComponentProps, IUserAuthContainerProps {}

interface ISignUpFormState {
	username: string;
	password1: string;
	password2: string;
	email: string;
	country: string;
}

const initialState: ISignUpFormState = {
	username: '',
	password1: '',
	password2: '',
	email: '',
	country: '',
};

const validate: Yup.Schema<object> = Yup.object().shape({
	username: Yup.string()
		.min(7, 'username: Username must be at least 7 characters')
		.max(21, 'username: Username cannot be longer than 21 characters')
		.required('username: Username is Required'),
	password1: Yup.string()
		.min(8, 'password1: Password must be at least 8 characters')
		.max(21, 'password1: Password cannot be longer than 21 characters')
		.required(),
	password2: Yup.string()
		.oneOf([ Yup.ref('password1'), null ], 'password2: Passwords must match')
		.required('password2: Confirm password is required'),
	email: Yup.string().email('email: Email address is not valid'),
	country: Yup.string().required('country: Country is required'),
});

const SignUpForm: React.SFC<ISignUpFormProps> = (props: ISignUpFormProps) => {
	React.useEffect(
		(): void => {
			if (props.currentUser) {
				props.history.push('/');
			}
		},
		[ props.currentUser ],
	);

	const FormState: IFormState = useFormHook(initialState);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const validateOpts: Yup.ValidateOptions = { abortEarly: false };
			await validate.validate(FormState.inputs, validateOpts);
			await props.signupUser(FormState.inputs as ISignUpCred);
			FormState.resetForm();
		} catch (error) {
			FormState.handleErrors(error.errors as Yup.ValidationError);
		}
	};

	return (
		<div className='form-cont'>
			<form onSubmit={handleSubmit} className='form'>
				<h1>Signup Here</h1>
				<Field
					type='text'
					label='Username'
					name='username'
					value={FormState.inputs.username}
					placeholder='Enter Your Username'
					errors={FormState.errors.username}
					onChange={FormState.handleInput}
				/>
				<Field
					type='text'
					label='Password'
					name='password1'
					value={FormState.inputs.password1}
					placeholder='Enter Your Password'
					errors={FormState.errors.password1}
					onChange={FormState.handleInput}
				/>
				<Field
					type='text'
					label='Confirm Password'
					name='password2'
					value={FormState.inputs.password2}
					placeholder='Confirm Your Password'
					errors={FormState.errors.password2}
					onChange={FormState.handleInput}
				/>
				<Field
					type='text'
					label='Email'
					name='email'
					value={FormState.inputs.email}
					placeholder='Enter Your Email'
					errors={FormState.errors.email}
					onChange={FormState.handleInput}
				/>
				<Field
					type='text'
					label='Country'
					name='country'
					value={FormState.inputs.country}
					placeholder='Enter Your Country'
					errors={FormState.errors.country}
					onChange={FormState.handleInput}
				/>
				<button type='submit' className='btn-submit'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default SignUpForm;
