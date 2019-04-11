import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { LoginCred } from '../../store/actions/actionCreators/user';
import useFormHook, { IFormState } from '../hooks/useForm';
import * as Yup from 'yup';
import Field from './field';
import { IUserAuthContainerProps } from '../containers/userAuthContainer';

interface ILoginFormProps extends RouteComponentProps, IUserAuthContainerProps {}

interface ILoginState {
	username: string;
	password: string;
}

const initialState: ILoginState = {
	username: '',
	password: ''
};

const validate: Yup.Schema<object> = Yup.object().shape({
	username: Yup.string().required('username: Username is Required!'),
	password: Yup.string().required('password: Password is Required!')
});

const LoginForm: React.FC<ILoginFormProps> = (props: ILoginFormProps) => {
	React.useEffect(
		(): void => {
			if (props.currentUser) {
				props.history.push('/');
			}
		},
		[ props.currentUser ]
	);

	const FormState: IFormState = useFormHook(initialState);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		try {
			const validateOpts: Yup.ValidateOptions = { abortEarly: false };
			await validate.validate(FormState.inputs, validateOpts);
			await props.loginUser(FormState.inputs as LoginCred);
			FormState.resetForm();
		} catch (error) {
			FormState.handleErrors(error.errors as Yup.ValidationError);
		}
	};

	return (
		<div className='form-cont'>
			<form onSubmit={handleSubmit} className='form'>
				<h1>Login Here</h1>
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
					name='password'
					value={FormState.inputs.password}
					placeholder='Enter Your Password'
					errors={FormState.errors.password}
					onChange={FormState.handleInput}
				/>
				<button className='btn-submit' type='submit'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
