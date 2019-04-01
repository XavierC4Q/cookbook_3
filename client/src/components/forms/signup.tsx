import * as React from 'react';
import { RouteProps } from 'react-router-dom';
import { IUser } from '../../store/reducers/user';
import { SignUpCred } from '../../store/actions/actionCreators/user';

interface ISignUpFormProps extends RouteProps {
	loggedIn: IUser | null;
	loading: boolean;
	err: string;
	signup: (cred: SignUpCred) => void;
}

const SignUpForm: React.SFC<ISignUpFormProps> = (props: ISignUpFormProps) => {
	return (
		<div>
			<form>
				<h1>Signup Here</h1>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default SignUpForm;
