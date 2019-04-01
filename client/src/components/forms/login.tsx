import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IUser } from '../../store/reducers/user';
import { LoginCred } from '../../store/actions/actionCreators/user';
import useFormHook, { IFormState } from '../hooks/useForm';
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

	return (
		<div>
			<form>
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
