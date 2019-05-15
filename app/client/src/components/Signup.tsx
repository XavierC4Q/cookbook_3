import * as React from 'react';
import { Field, Form, Formik, FormikActions, FormikProps } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
import { UserAuthState } from '../store/auth/reducers';
import { INewUserCredentials } from '../store/auth/types';
import { showErrors, signupValidate, FieldInput } from './formUtil';

type OwnProps = { signupUser: (info: INewUserCredentials) => void };

type Props = UserAuthState & RouteComponentProps & OwnProps;

const Signup: React.FC<Props> = (props) => {
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
				password1: '',
				password2: '',
				country: '',
				email: '',
			}}
			validationSchema={signupValidate}
			onSubmit={(values: INewUserCredentials, actions: FormikActions<INewUserCredentials>) => {
				props.signupUser(values);
			}}
			enableReinitialize
			render={({ errors, values, ...actions }: FormikProps<INewUserCredentials>) => {
				return (
					<div>
						<h2>Signup Below</h2>
						<Form>
							<Field name='username' component={FieldInput} label='Enter Your Username' />
							<Field name='password1' component={FieldInput} label='Enter Your Password' />
							<Field name='password2' component={FieldInput} label='Confirm Your Password' />
							<Field name='country' component={FieldInput} label='Enter Your Country' />
							<Field name='email' component={FieldInput} label='Enter Your Email' />
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

export default Signup;
