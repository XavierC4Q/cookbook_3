import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IUser } from '../../store/reducers/user';
import { LoginCred } from '../../store/actions/actionCreators/user';
import useFormHook, { IFormState } from '../hooks/useForm';
import * as Yup from 'yup';
import Field from './field';

interface ILoginFormProps extends RouteComponentProps {
	loggedIn: IUser | null;
	loading: boolean;
	err: string;
	login: (cred: LoginCred) => void;
}

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
			if (props.loggedIn) {
				props.history.push('/');
			}
		},
		[ props.loggedIn ]
	);

	const FormState: IFormState = useFormHook(initialState);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		try {
			const validateOpts: Yup.ValidateOptions = { abortEarly: false };
			await validate.validate(FormState.inputs, validateOpts);
			await props.login(FormState.inputs as LoginCred);
			FormState.resetForm();
		} catch (error) {
			FormState.handleErrors(error.errors as Yup.ValidationError);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
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
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default LoginForm;
