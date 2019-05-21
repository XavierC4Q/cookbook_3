import * as React from 'react';
import { Field, Form, Formik, FormikActions, FormikProps } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
import { UserAuthState } from '../store/auth/reducers';
import { ICredentials } from '../store/auth/types';
import { showErrors, loginValidate, FieldInput } from './util/forms';

type OwnProps = { loginUser: (info: ICredentials) => void };

type Props = UserAuthState & RouteComponentProps & OwnProps;

const Login: React.FC<Props> = (props) => {
	React.useEffect(
		(): void => {
			if (props.currentUser) {
				props.history.push('/');
			}
		},
		[ props.currentUser, props.history ],
	);

	return (
		<Formik
			initialValues={{
				username: '',
				password: '',
			}}
			validationSchema={loginValidate}
			onSubmit={(values: ICredentials, actions: FormikActions<ICredentials>) => {
				props.loginUser(values);
			}}
			enableReinitialize
			render={({ errors, values, ...actions }: FormikProps<ICredentials>) => {
				return (
					<div>
						<h2>Login Below</h2>
						<Form>
							<Field name='username' component={FieldInput} label='Enter Your Username' />
							<Field name='password' component={FieldInput} label='Enter Your Password' />
							<section>
								<div>
									<button type='submit'>Submit</button>
								</div>
								<div>{props.authError}</div>
								<div>{showErrors(errors)}</div>
							</section>
						</Form>
					</div>
				);
			}}
		/>
	);
};

export default Login;
